<?php 

$user_name = $_POST['username'];
$user_number = $_POST['usernumber'];
$user_promocode = $_POST['userpromocode'];


require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';
$mail->isSMTP();
$mail->Host = 'smtp.ukr.net';
$mail->SMTPAuth = true;
$mail->Username = 'web.development@ukr.net';
$mail->Password = 'passdeletedandrevoked';
$mail->SMTPSecure = 'ssl';
$mail->Port = 465;
$mail->setFrom('web.development@ukr.net', 'LEX');
$mail->addAddress('web.development@ukr.net');
$mail->isHTML(true);
$mail->Subject = 'Лист із LEX';
$mail->Body    = '
	Користувач сайту <b>LEX</b> залишив заявку!<br><br> 
	Ім*я: ' . $user_name . ' <br>
	Номер телефону: ' . $user_number . ' <br>
	Промокод: ' . $user_promocode . '';

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>