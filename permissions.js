const permissions = {
	type: 'service_account',
	project_id: 'amzn-cooma',
	private_key_id: process.env.FIRE_PRIVATE_KEY_ID,
	private_key: process.env.FIRE_PRIVATE_KEY,
	client_email: 'firebase-adminsdk-rhfwv@amzn-cooma.iam.gserviceaccount.com',
	client_id: '105761568874597233051',
	auth_uri: 'https://accounts.google.com/o/oauth2/auth',
	token_uri: 'https://oauth2.googleapis.com/token',
	auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
	client_x509_cert_url:
		'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-rhfwv%40amzn-cooma.iam.gserviceaccount.com',
};

export default permissions;
