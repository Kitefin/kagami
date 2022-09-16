// you need to setup syncs named 'donate_history' in your Moralis servers
Moralis.Cloud.beforeSave("donate_history", async (request) =>{
    const confirmed = request.object.get("confirmed");
    const amount = request.object.get("amount");
    const from = request.object.get("from");
    let msg = `New donation of ${amount} MATIC, from ${from}!`;

    logger.info("it's triggered");
    const logger = Moralis.Cloud.getLogger();
    logger.info(msg);

    const ADMIN_PHONE_NUMBER = await getEnv("ADMIN_PHONE_NUMBER");
    const TEST_PHONE_NUMBER = await getEnv("TEST_PHONE_NUMBER");
    const TWILLO_AUTH_TOKEN = await getEnv("TWILLO_AUTH_TOKEN");
    const TWILLO_ACCOUNT_SID = await getEnv("TWILLO_ACCOUNT_SID");
    const SENDGRID_API_KEY = await getEnv("SENDGRID_API_KEY");

    if(confirmed){
        let data = {
           body: "This will be the body of the new message",
           from: ADMIN_PHONE_NUMBER,
           to: TEST_PHONE_NUMBER,
        }
    
        Moralis.Cloud.httpRequest({
            method: "POST",
            url: `https://${TWILLO_ACCOUNT_SID}:${TWILLO_AUTH_TOKEN}@api.twilio.com/2010-04-01/Accounts/${TWILLO_ACCOUNT_SID}/Messages.json`,
            body: data,
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(function (res){
            logger.info('res')
            logger.info(res)
            logger.info(res.text)
            logger.info(res.data)
        }, function(err){
            logger.info('err')
            logger.info(err)
            logger.info(err.status)
            logger.info(err.text)
        })

        let dataEmail = {
            "personalizations": [
                {
                  "to": [
                    {
                      "email": "watcher.test2022@gmail.com"
                    }
                  ],
                  "subject": "Hello, Kagami!"
                }
              ],
              "from": {
                "email": "sgdn6v18@kke.com"
              },
              "content": [
                {
                  "type": "text/plain",
                  "value": "Hello, Kagami!"
                }
              ]
        }

        logger.info('SENDGRID_API_KEY');
        logger.info(SENDGRID_API_KEY);

        Moralis.Cloud.httpRequest({
            method: "POST",
            url: "https://api.sendgrid.com/v3/mail/send",
            body: dataEmail,
            headers: {
                'Authorization': `Basic ${SENDGRID_API_KEY}`,
                'Content-Type': 'application/json',
            }
        }).then(function (res){
            logger.info('res in email')
            logger.info(res)
            logger.info(res.text)
            logger.info(res.data)
        }, function(err){
            logger.info('err in email')
            logger.info(err.status)
            logger.info(err.text)
        })

        // let dataEmail = {
        //     app_id: 123, //From OneSignal
        //     contents: {"en": "Notification"},
        //     included_segments: [], //Array of OneSignal Segements you wish to send sms to
        //     name: "Email",
        //     email_body: msg,
        //     email_subject: "New Donation Received"
        // }
            
        // Moralis.Cloud.httpRequest({
        //       method: "POST",
        //       url: "https://onesignal.com/api/v1/notifications",
        //       body: dataEmail,
        //       headers: {
        //           'Content-Type': 'application/json',
        //           'Authorization': 'Basic ' // Add Rest API Key from OneSignal
        //       }
        //     })
    }
})