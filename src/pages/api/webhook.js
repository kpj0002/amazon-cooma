import { buffer } from 'micro';
import * as admin from 'firebase-admin';

// secure a connection to firebase from backend
const serviceAccount = require('../../../permissions');
console.log(serviceAccount);

const app = !admin.apps.length
	? admin.initializeApp({
			credential: admin.credential.cert(serviceAccount.default),
	  })
	: admin.app();

// Establish conneciton to stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_SIGNING_SECRET;

const fulfillOrder = async (session) => {
	console.log(' Session : ', session);
	return app
		.firestore()
		.collection('users')
		.doc(session.metadata.email)
		.collection('orders')
		.doc(session.id)
		.set({
			amount: session.amount_total / 100,
			amount_shipping: session.total_details.amount_shipping / 100,
			images: JSON.parse(session.metadata.images),
			timestamp: admin.firestore.FieldValue.serverTimestamp(),
		})
		.then(() => {
			console.log('SUCCESS order ', session.id);
		})
		.catch((err) => console.log('ERROR >> ', err.message));
};

export default async (req, res) => {
	if (req.method === 'POST') {
		// generate certificate
		const requestBuffer = await buffer(req);
		const payload = requestBuffer.toString();
		const sig = req.headers['stripe-signature'];
		let event;

		// verify the EVENT posted came from stripe
		try {
			event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
		} catch (err) {
			console.log('Error >> ', err.message);
			return res.status(400).send(`Webhook error: ${err.message}`);
		}

		//handle  the checkout.session. complete event

		if (event.type === 'checkout.session.completed') {
			const session = event.data.object;

			//fullfill order
			return fulfillOrder(session)
				.then(() => res.status(200))
				.catch((err) => {
					console.log('Error >> ', err.message);
					return res.status(400).send('webhook error');
				});
		}
	}
};

export const config = {
	api: {
		bodyParser: false,
		externalResolver: true,
	},
};
