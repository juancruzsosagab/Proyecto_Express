const nodemailer = require('nodemailer');

async function emailService(info){

try {

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD 
        }
    });
    const mailOptions = {
        from: "riverplate949494", 
        to: 'juancruz.sosag@gmail.com', //VER DE TRAER EL EMAIL
        subject: 'Compra exitosa',
        text: 'Tu compra ha sido exitosa, el producto que compraste es '+producto.name
    };
    transporter.sendMail(mailOptions, (err, data) => {
        if (err) {
         console.log('Error occurs',err);
        }
         console.log('Email sent!!!');
    })

} catch(error){
    console.log(error)
}
}

module.exports = {emailService}
