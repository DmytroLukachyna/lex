<?php

/**
 * PHPMailer multiple files upload and send example
 */

//Import the PHPMailer class into the global namespace

use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    require 'src/Exception.php';
    require 'src/PHPMailer.php';
    require 'src/SMTP.php';


$request_name = $_POST['requestname'];
$request_number = $_POST['requestnumber'];
$request_email = $_POST['requestemail'];
$request_vin = $_POST['requestvin'];
$request_plate = $_POST['requestplate'];
$request_trustedname = $_POST['requesttrustedname'];
$request_trustednumber = $_POST['requesttrustednumber'];
$request_codeword = $_POST['requestcodeword'];
$request_services = $_POST['requestservices'];
$request_checkbox = $_POST['requestcheckbox'];

$msg = '';
$mail = new PHPMailer();
    $mail->isSMTP();
    $mail->CharSet = 'utf-8'; 
	$mail->Host = 'smtp.post.box';
	$mail->SMTPAuth = true;
	$mail->Username = 'email@addre.ss';
	$mail->Password = 'passdeletedandrevoked';
	$mail->SMTPSecure = 'ssl';
	$mail->Port = 465;
    $mail->setFrom('email@addre.ss', 'LEX');
    $mail->addAddress('email@addre.ss');
    $mail->Subject = 'Лист із LEX';
    $mail->Body = 'Користувач сайту LEX залишив заявку! 
	ПІБ власника транспортного засобу: ' . $request_name . ' 
    Номер телефону: ' . $request_number . ' 
    Електронна пошта: ' . $request_email . ' 
    VIN-код авто: ' . $request_vin . ' 
    Номер авто: ' . $request_plate . ' 
    ПІБ довіреної особи: ' . $request_trustedname . ' 
    Номер телефону довіреної особи: ' . $request_trustednumber . ' 
    Обраний пакет: ' . $request_services . ' 
    Чи дана згода: ' . $request_checkbox . ' 
    Кодове слово: ' . $request_codeword . '';
if (array_key_exists('userfile', $_FILES)) {
    // Create a message
    
    // Attach multiple files one by one
    for ($ct = 0, $ctMax = count($_FILES['userfile']['tmp_name']); $ct < $ctMax; $ct++) {
        // Extract an extension from the provided filename
        $ext = PHPMailer::mb_pathinfo($_FILES['userfile']['name'], PATHINFO_EXTENSION);
        // Define a safe location to move the uploaded file to, preserving the extension
        $uploadfile = tempnam(sys_get_temp_dir(), hash('sha256', $_FILES['userfile']['name'][$ct])) . '.' . $ext;
        $filename = $_FILES['userfile']['name'][$ct];
        if (move_uploaded_file($_FILES['userfile']['tmp_name'][$ct], $uploadfile)) {
            if (!$mail->addAttachment($uploadfile, $filename)) {
                $msg .= 'Failed to attach file ' . $filename;
            }
        } else {
            $msg .= 'Failed to move file to ' . $uploadfile;
        }
    }
    if (!$mail->send()) {
        $msg .= 'Mailer Error: ' . $mail->ErrorInfo;
    } else {
        $msg .= 'Message sent!';
    }
}
?>