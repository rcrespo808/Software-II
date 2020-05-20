const nodemailer = require('nodemailer');
const log = console.log;

const sender = {};
// Step 1
sender.transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'rcrespo809@gmail.com', // TODO: gmail account
        pass: '!QWER1234q' // TODO: gmail password
    }
});

// Step 2
sender.mailOptions = {
    from: 'ApoyoTerapia@gmail.com', 
    to: 'rcrespo808@gmail.com', 
    subject: 'Nodemailer - Test',
    text: 'Wooohooo it works!!'
};

sender.sendmailWithOptions = async (options) => {
    sender.mailOptions.from = options.from || 'ApoyoTerapia@gmail.com';
    sender.mailOptions.to = options.to;
    sender.mailOptions.subject = options.subject;
    sender.mailOptions.subject = options.subject;
    sender.mailOptions.template = options.template;
    sender.mailOptions.context = options.context;
    
};

// Step 3
sender.sendMail = transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        return log('Error occurs');
    }
    return log('Email sent!!!');
});

