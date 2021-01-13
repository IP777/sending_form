<?php 

//https://www.000webhost.com/forum/t/how-to-use-phpmailer/134686

//Пример создания письма - HTML
// $htmlBody = '
// <head>
// <title>My HTML Email</title>
// </head>
// <body>
// <img src="http://www.phpfreaks.com/images/phpfreaks_logo.jpg" alt="PHP Freaks" />

// <h2>PHP Freaks Rules!</h2>
// <p>We invite you to visit
// <a href="http://www.phpfreaks.com" title="PHP Freaks">PHP Freaks.com</a>
// for a loving community of PHP Developers who enjoy helping each
// other learn the language!</p>

// <p>Sincerely,<br />
// PHP Freaks Staff</p>';

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['user_name'];
$phone = $_POST['user_phone'];
$email = $_POST['user_email'];
$text = $_POST['user_text'];

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.gmail.com';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = ''; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = ''; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;  // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom('gi8544562@gmail.com'); // от кого будет уходить письмо?
$mail->addAddress('ivanov.piter.86@gmail.com');     // Кому будет уходить письмо 
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Заявка с тестового сайта';
//$mail->Body    = '' .$name . ' оставил заявку, его телефон ' .$phone. '<br>Почта этого пользователя: ' .$email .$text;
$mail->Body    = "{$name} оставил заявку, его телефон  {$phone} <br>Почта этого пользователя:  {$email} <br> {$text}";
$mail->AltBody = '';

if(!$mail->send()) {
    echo 'Error';
} else {
    echo 'Message send';
}
?>
