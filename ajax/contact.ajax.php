<?php

ini_set('display_errors', 'On');

if(isset($_POST) && isset($_POST['contact'])) {
	$contact = json_decode($_POST['contact'], true);
	if (!isset($contact['type'])) {
		echo json_encode(array('success' => 0));
		exit;
	}

	if($contact['type'] == "index") {
		
		$newMessage = '<table cellpadding="0" cellspacing="0" border="0" align="center" width="600" height="35">'.
						  '<tbody><tr>'.
						  '<td style="font-size: 18px; font-weight: strong;"> New '.$contact['domain'].' contact - Message  </td>'.
						  '</tr></tbody>'.
						  '</table>'.
						  '<table cellpadding="0" cellspacing="0" border="0" align="center" width="600">'.
						  '<tbody><tr>'.
						  '<td width="175"> Name </td>'.
						  '<td width="525">: '.$contact['name'].'</td>'.
						  '</tr>'.
						  '<tr>'.
						  '<td width="175"> Email </td>'.
						  '<td width="525">: '.$contact['email'].'</td>'.
						  '</tr>'.
						  '<tr>'.
						  '<td width="175"> Telephone </td>'.
						  '<td width="525">: '.$contact['telephone'].'</td>'.
						  '</tr>'.
						  '<tr>'.
						  '<td width="175"> Message </td>'.
						  '<td width="525">: '.$contact['message'].'</td>'.
						  '</tr>'.
						  '<tr>'.
						  '<td width="175"> Created On </td>'.
						  '<td width="525">: '.date("F j, Y, g:i a").'</td>'.
						  '</tr></tbody>'.
						  '</table>';
			$headers = "MIME-Version: 1.0" . "\r\n";
			$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
			$headers .= 'From: no-reply@brentwoodky.com' . "\r\n";

			$result = mail('andrews@vestadvertising.com', 'Contact | Brentwood - Message', $newMessage, $headers);
			echo json_encode(array( "success" => 1, "code" => 1));
	}
	elseif ($contact['type'] == "modal") {
		$newMessage = '<table cellpadding="0" cellspacing="0" border="0" align="center" width="600" height="35">'.
						  '<tbody><tr>'.
						  '<td style="font-size: 18px; font-weight: strong;"> New '.$contact['domain'].' contact - Message  </td>'.
						  '</tr></tbody>'.
						  '</table>'.
						  '<table cellpadding="0" cellspacing="0" border="0" align="center" width="600">'.
						  '<tbody><tr>'.
						  '<td width="175"> Name </td>'.
						  '<td width="525">: '.$contact['name'].'</td>'.
						  '</tr>'.
						  '<tr>'.
						  '<td width="175"> Email </td>'.
						  '<td width="525">: '.$contact['email'].'</td>'.
						  '</tr>'.
						  '<tr>'.
						  '<td width="175"> Telephone </td>'.
						  '<td width="525">: '.$contact['telephone'].'</td>'.
						  '</tr>'.
						  '<tr>'.
						  '<td width="175"> Created On </td>'.
						  '<td width="525">: '.date("F j, Y, g:i a").'</td>'.
						  '</tr></tbody>'.
						  '</table>';
			$headers = "MIME-Version: 1.0" . "\r\n";
			$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
			$headers .= 'From: no-reply@brentwoodky.com' . "\r\n";

			$result = mail('andrews@vestadvertising.com', 'Contact | Brentwood - Packet Download', $newMessage, $headers);
			echo json_encode(array( "success" => 1, "code" => 1));
	}
}
?>