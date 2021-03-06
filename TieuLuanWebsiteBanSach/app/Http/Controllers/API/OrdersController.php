<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\repositories\OrderRepository;
use Illuminate\Http\Request;
use App\Models\Order;
use Session;
use App\Models\Coupon;
session_start();
use App\Models\OrderDetails;
use Cart;

class OrdersController extends Controller
{
    public $orderRepository;

    public function __construct(OrderRepository $orderRepository) {
        $this->orderRepository = $orderRepository;
    }

    public function index()
    {
        $orders = Order::paginate(4);
        return $orders;
    }

    public function show($id)
    {
        $orders = $this->orderRepository->findById($id);
        if(is_null($orders))
        {
            return response()->json([
                'success' => false,
                'message' => 'Order Details',
                'data'    => null
            ]);
        }
        return response()->json([
            'success' => true,
            'message' => 'Order Details',
            'data'    => $orders
        ]);
    }

    public function update(Request $request, $id)
    {
        $orders = $this->orderRepository->findById($id);
        if (is_null($orders)) {
            return response()->json([
                'success' => false,
                'message' => 'Order Not found',
                'data' => null,
            ]);
        }

        $formData = $request->all();
        $validator = \Validator::make($formData, [
            'customer_id' => 'required',
            'name' => 'required',
            'email' => 'required',
            'city' => 'required',
            'province' => 'required',
            'wards' => 'required',
            'address' => 'required',
            'phone' => 'required',
            'note' => 'required',
            'feeship' => 'required',
            'totalPrice' => 'required',
            'paymentMethod' => 'required',
            'status' => 'required',
            'prevTotalPrice' => 'required',
            'coupon_code' => 'required',
            'coupon_number' => 'required',
        ], [
            'customer_id.required' => 'Please give customer id',
            'name.required' => 'Please give name for shipping',
            'email.required' => 'Please give email for shipping',
            'city.required' => 'Please give city for shipping',
            'province.required' => 'Please give province for shipping',
            'wards.required' => 'Please give wards for shipping',
            'address.required' => 'Please give address for shipping',
            'phone.required' => 'Please give phone for shipping',
            'note.required' => 'Please give note for shipping',
            'feeship.required' => 'Please give feeship for shipping',
            'totalPrice.required' => 'Please give totalPrice shipping',
            'paymentMethod.required' => 'Please give paymentMethod for shipping',
            'status.required' => 'Please give status for shipping',
            'prevTotalPrice' => 'Please give prevTotalPrice for shipping',
            'coupon_code' => 'Please give coupon_code for shipping',
            'coupon_number' => 'Please give coupon_number for shipping'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }

        $orders = $this->orderRepository->edit($request, $id);
        return response()->json([
            'success' => true,
            'message' => 'Order Updated',
            'data'    => $orders
        ]);
    }

    public function storeCOD(Request $request)
    {
        $formData = $request->all();
        $validator = \Validator::make($formData, [
            'customer_id' => 'required',
            'name' => 'required',
            'email' => 'required',
            'city' => 'required',
            'province' => 'required',
            'wards' => 'required',
            'address' => 'required',
            'phone' => 'required',
            'feeship' => 'required',
            'totalPrice' => 'required',
            'paymentMethod' => 'required',
            'status' => 'required',
            'prevTotalPrice' => 'required'
        ], [
            'customer_id.required' => 'Please give customer id',
            'name.required' => 'Please give name for shipping',
            'email.required' => 'Please give email for shipping',
            'city.required' => 'Please give city for shipping',
            'province.required' => 'Please give province for shipping',
            'wards.required' => 'Please give wards for shipping',
            'address.required' => 'Please give address for shipping',
            'phone.required' => 'Please give phone for shipping',
            'feeship.required' => 'Please give feeship for shipping',
            'totalPrice.required' => 'Please give totalPrice shipping',
            'paymentMethod.required' => 'Please give paymentMethod for shipping',
            'status.required' => 'Please give status for shipping',
            'prevTotalPrice' => 'Please give prevTotalPrice for shipping'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }
        $orders = $this->orderRepository->create($request);
        return response()->json([
            'success' => true,
            'message' => 'Order Stored',
            'data'    => $orders
        ]);
    }

    public function store(Request $request)
    {
        $formData = $request->all();
        $validator = \Validator::make($formData, [
            'customer_id' => 'required',
            'name' => 'required',
            'email' => 'required',
            'city' => 'required',
            'province' => 'required',
            'wards' => 'required',
            'address' => 'required',
            'phone' => 'required',
            'feeship' => 'required',
            'totalPrice' => 'required',
            'paymentMethod' => 'required',
            'status' => 'required',
            'prevTotalPrice' => 'required'
        ], [
            'customer_id.required' => 'Please give customer id',
            'name.required' => 'Please give name for shipping',
            'email.required' => 'Please give email for shipping',
            'city.required' => 'Please give city for shipping',
            'province.required' => 'Please give province for shipping',
            'wards.required' => 'Please give wards for shipping',
            'address.required' => 'Please give address for shipping',
            'phone.required' => 'Please give phone for shipping',
            'feeship.required' => 'Please give feeship for shipping',
            'totalPrice.required' => 'Please give totalPrice shipping',
            'paymentMethod.required' => 'Please give paymentMethod for shipping',
            'status.required' => 'Please give status for shipping',
            'prevTotalPrice' => 'Please give prevTotalPrice for shipping'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->getMessageBag()->first(),
                'errors' => $validator->getMessageBag(),
            ]);
        }
        $orders = $this->orderRepository->create($request);

        /* -----------------------------------------------------------------------------

        Version 2.0

        @author OnePAY

        ------------------------------------------------------------------------------*/

        // *********************
        // START OF MAIN PROGRAM
        // *********************

        // Define Constants
        // ----------------
        // This is secret for encoding the MD5 hash
        // This secret will vary from merchant to merchant
        // To not create a secure hash, let SECURE_SECRET be an empty string - ""
        // $SECURE_SECRET = "secure-hash-secret";
        // Kh??a b?? m???t - ???????c c???p b???i OnePAY
        $SECURE_SECRET = "A3EFDFABA8653DF2342E8DAC29B51AF0";

        $data_onepay['virtualPaymentClientURL'] = 'https://mtf.onepay.vn/onecomm-pay/vpc.op';
        // add the start of the vpcURL querystring parameters
        // *****************************L???y gi?? tr??? url c???ng thanh to??n*****************************
        $vpcURL =  $data_onepay['virtualPaymentClientURL'] . "?";

        // Remove the Virtual Payment Client URL from the parameter hash as we 
        // do not want to send these fields to the Virtual Payment Client.
        // b??? gi?? tr??? url v?? n??t submit ra kh???i m???ng d??? li???u
        unset( $data_onepay['virtualPaymentClientURL']); 
        unset($request->SubButL);

        //$stringHashData = $SECURE_SECRET; *****************************Kh???i t???o chu???i d??? li???u m?? h??a tr???ng*****************************
        $stringHashData = "";
        $data = $request->all();

                $data_onepay['vpc_Merchant'] =  'ONEPAY';
                $data_onepay['vpc_AccessCode'] = 'D67342C2';
                $data_onepay['vpc_MerchTxnRef'] = '202012051903352146282783';
                $data_onepay['vpc_OrderInfo'] = 'JSECURETEST01';
                $data_onepay['vpc_Amount'] = $data['vpc_Amount'];
                $data_onepay['vpc_ReturnURL'] = 'http://127.0.0.1:8000/shopbansach/onepay';
                $data_onepay['vpc_Version'] = '2';
                $data_onepay['vpc_Locale'] = 'vn';
                $data_onepay['vpc_Currency'] = 'VND';
                $data_onepay['vpc_TicketNo'] = '::1';
                $data_onepay['vpc_SHIP_Street01'] = '39A Ngo Quyen';
                $data_onepay['vpc_SHIP_Provice'] = 'Hoan Kiem';
                $data_onepay['vpc_SHIP_City'] = 'Ha Noi';
                $data_onepay['vpc_SHIP_Country'] = 'Viet Nam';
                $data_onepay['vpc_Customer_Phone'] = '840904280949';
                $data_onepay['vpc_Customer_Email'] = 'support@onepay.vn';
                $data_onepay['vpc_Customer_Id'] = 'thanhvt';
                $data_onepay['vpc_Command'] = 'pay';
                $data_onepay['Title'] = 'VPC 3-Party';

      
        // s???p x???p d??? li???u theo th??? t??? a-z tr?????c khi n???i l???i
        // arrange array data a-z before make a hash
        ksort ($data_onepay);

        // set a parameter to show the first pair in the URL
        // ?????t tham s??? ?????m = 0
        $appendAmp = 0;

        date_default_timezone_set('Asia/Krasnoyarsk');
        $data_onepay['vpc_MerchTxnRef'] = date ( 'YmdHis' ) . rand ();

        foreach($data_onepay as $key => $value) {

            // create the md5 input and URL leaving out any fields that have no value
            // t???o chu???i ?????u d??? li???u nh???ng tham s??? c?? d??? li???u
            if (strlen($value) > 0) {
                // this ensures the first paramter of the URL is preceded by the '?' char
                if ($appendAmp == 0) {
                    $vpcURL .= urlencode($key) . '=' . urlencode($value);
                    $appendAmp = 1;
                } else {
                    $vpcURL .= '&' . urlencode($key) . "=" . urlencode($value);
                }
                //$stringHashData .= $value; *****************************s??? d???ng c??? t??n v?? gi?? tr??? tham s??? ????? m?? h??a*****************************
                if ((strlen($value) > 0) && ((substr($key, 0,4)=="vpc_") || (substr($key,0,5) =="user_"))) {
                    $stringHashData .= $key . "=" . $value . "&";
                }
            }
        }
        //*****************************x??a k?? t??? & ??? th???a ??? cu???i chu???i d??? li???u m?? h??a*****************************
        $stringHashData = rtrim($stringHashData, "&");
        // Create the secure hash and append it to the Virtual Payment Client Data if
        // the merchant secret has been provided.
        // th??m gi?? tr??? chu???i m?? h??a d??? li???u ???????c t???o ra ??? tr??n v??o cu???i url
        if (strlen($SECURE_SECRET) > 0) {
            //$vpcURL .= "&vpc_SecureHash=" . strtoupper(md5($stringHashData));
            // *****************************Thay h??m m?? h??a d??? li???u*****************************
            $vpcURL .= "&vpc_SecureHash=" . strtoupper(hash_hmac('SHA256', $stringHashData, pack('H*',$SECURE_SECRET)));
        }

        // FINISH TRANSACTION - Redirect the customers using the Digital Order
        // ===================================================================
        // chuy???n tr??nh duy???t sang c???ng thanh to??n theo URL ???????c t???o ra
        // header("Location: ".$vpcURL);

        // *******************
        // END OF MAIN PROGRAM
        // *******************

        return response()->json([
            'success' => true,
            'message' => 'OrderItem Stored',
            'data'    => $orders,
            'url_one_pay' => $vpcURL
        ]);
    }

    public function destroy($id)
    {
        $orders = $this->orderRepository->findById($id);
        if (is_null($orders)) {
            return response()->json([
                'success' => false,
                'message' => 'Order Not found',
                'data' => null,
            ]);
        }

        $orders = $this->orderRepository->delete($id);
        return response()->json([
            'success' => true,  
            'message' => 'Order Deleted',
            'data'    => $orders
        ]);
    }

    public function callbackOnePay(Request $request){
        $SECURE_SECRET = "A3EFDFABA8653DF2342E8DAC29B51AF0";

        // If there has been a merchant secret set then sort and loop through all the
        // data in the Virtual Payment Client response. While we have the data, we can
        // append all the fields that contain values (except the secure hash) so that
        // we can create a hash and validate it against the secure hash in the Virtual
        // Payment Client response.


        // NOTE: If the vpc_TxnResponseCode in not a single character then
        // there was a Virtual Payment Client error and we cannot accurately validate
        // the incoming data from the secure hash. */

        // get and remove the vpc_TxnResponseCode code from the response fields as we
        // do not want to include this field in the hash calculation
        $vpc_Txn_Secure_Hash = $request->vpc_SecureHash;
        unset ( $_GET ["vpc_SecureHash"] );

        // set a flag to indicate if hash has been validated
        $errorExists = false;

        // ksort ($_GET);

        if (strlen ( $SECURE_SECRET ) > 0 && $request->vpc_TxnResponseCode != "7" && $request->vpc_TxnResponseCode != "No Value Returned") {

            //$stringHashData = $SECURE_SECRET;
            //*****************************kh???i t???o chu???i m?? h??a r???ng*****************************
            $stringHashData = "";

            // sort all the incoming vpc response fields and leave out any with no value
            foreach ( $request->all() as $key => $value ) {
            // if ($key != "vpc_SecureHash" or strlen($value) > 0) {
            //      $stringHashData .= $value;
            // }
            // *****************************ch??? l???y c??c tham s??? b???t ?????u b???ng "vpc_" ho???c "user_" v?? kh??c tr???ng v?? kh??ng ph???i chu???i hash code tr??? v???*****************************
                if ($key != "vpc_SecureHash" && (strlen($value) > 0) && ((substr($key, 0,4)=="vpc_") || (substr($key,0,5) =="user_"))) {
                    $stringHashData .= $key . "=" . $value . "&";
                }
            }
            //  *****************************X??a d???u & th???a cu???i chu???i d??? li???u*****************************
            $stringHashData = rtrim($stringHashData, "&");


            //   if (strtoupper ( $vpc_Txn_Secure_Hash ) == strtoupper ( md5 ( $stringHashData ) )) {
            //   *****************************Thay h??m t???o chu???i m?? h??a*****************************
            if (strtoupper ( $vpc_Txn_Secure_Hash ) == strtoupper(hash_hmac('SHA256', $stringHashData, pack('H*',$SECURE_SECRET)))) {
                // Secure Hash validation succeeded, add a data field to be displayed
                // later.
                $hashValidated = "CORRECT";
            } else {
                // Secure Hash validation failed, add a data field to be displayed
                // later.
                $hashValidated = "INVALID HASH";
            }
        } else {
            // Secure Hash was not validated, add a data field to be displayed later.
            $hashValidated = "INVALID HASH";
        }

        // Define Variables
        // ----------------
        // Extract the available receipt fields from the VPC Response
        // If not present then let the value be equal to 'No Value Returned'
        // Standard Receipt Data
        $amount = $this->null2unknown( $request->vpc_Amount );
        $locale = $this->null2unknown( $request->vpc_Locale );
        //$batchNo = null2unknown ( $_GET ["vpc_BatchNo"] );
        $command =  $this->null2unknown( $request->vpc_Command );
        //$message = null2unknown ( $_GET ["vpc_Message"] );
        $version = $this->null2unknown ( $request->vpc_Version );
        //$cardType = null2unknown ( $_GET ["vpc_Card"] );
        $orderInfo = $this->null2unknown ( $request->vpc_OrderInfo );
        //$receiptNo = null2unknown ( $_GET ["vpc_ReceiptNo"] );
        $merchantID = $this->null2unknown ( $request->vpc_Merchant );
        //$authorizeID = null2unknown ( $_GET ["vpc_AuthorizeId"] );
        $merchTxnRef = $this->null2unknown ( $request->vpc_MerchTxnRef );
        $transactionNo = $this->null2unknown ( $request->vpc_TransactionNo );
        //$acqResponseCode = null2unknown ( $_GET ["vpc_AcqResponseCode"] );
        $txnResponseCode = $this->null2unknown ( $request->vpc_TxnResponseCode );

        $transStatus = "";
        if($hashValidated=="CORRECT" && $txnResponseCode=="0"){
            $transStatus = "Giao d???ch th??nh c??ng";
        }elseif ($hashValidated=="INVALID HASH" && $txnResponseCode=="0"){
            $transStatus = "Giao d???ch Pendding";
        }else {
            $transStatus = "Giao d???ch th???t b???i";
        }

        $data['transStatus'] = $transStatus;
        $data['merchantID'] = $merchantID;
        $data['merchTxnRef'] = $merchTxnRef;
        $data['orderInfo'] = $orderInfo;
        $data['amount'] = $amount;
        $data['txnResponseCode'] = $txnResponseCode;
        $data['statusTxnResponseCode'] = $this->getResponseDescription($txnResponseCode);
       
        
        return view('checkouted',compact('data'));

    }

    public function getResponseDescription($responseCode) {

        switch ($responseCode) {
            case "0" :
                $result = "Giao d???ch th??nh c??ng - Approved";
                break;
            case "1" :
                $result = "Ng??n h??ng t??? ch???i giao d???ch - Bank Declined";
                break;
            case "3" :
                $result = "M?? ????n v??? kh??ng t???n t???i - Merchant not exist";
                break;
            case "4" :
                $result = "Kh??ng ????ng access code - Invalid access code";
                break;
            case "5" :
                $result = "S??? ti???n kh??ng h???p l??? - Invalid amount";
                break;
            case "6" :
                $result = "M?? ti???n t??? kh??ng t???n t???i - Invalid currency code";
                break;
            case "7" :
                $result = "L???i kh??ng x??c ?????nh - Unspecified Failure ";
                break;
            case "8" :
                $result = "S??? th??? kh??ng ????ng - Invalid card Number";
                break;
            case "9" :
                $result = "T??n ch??? th??? kh??ng ????ng - Invalid card name";
                break;
            case "10" :
                $result = "Th??? h???t h???n/Th??? b??? kh??a - Expired Card";
                break;
            case "11" :
                $result = "Th??? ch??a ????ng k?? s??? d???ng d???ch v??? - Card Not Registed Service(internet banking)";
                break;
            case "12" :
                $result = "Ng??y ph??t h??nh/H???t h???n kh??ng ????ng - Invalid card date";
                break;
            case "13" :
                $result = "V?????t qu?? h???n m???c thanh to??n - Exist Amount";
                break;
            case "21" :
                $result = "S??? ti???n kh??ng ????? ????? thanh to??n - Insufficient fund";
                break;
            case "99" :
                $result = "Ng?????i s??? d???ng h???y giao d???ch - User cancel";
                break;
            default :
                $result = "Giao d???ch th???t b???i - Failured";
        }
        return $result;
    }
    
    public function null2unknown($data) {
        if ($data == "") {
            return "No Value Returned";
        } else {
            return $data;
        }
    }

    public function check_coupon(Request $request){
        $data = $request->all();
        $coupon = Coupon::where('coupon_code',$data['coupon'])->first();
        if($coupon){
            $count_coupon = $coupon->count();
            if($count_coupon>0){
                $coupon_session = Session::get('coupon');
                if($coupon_session==true){
                    $is_avaiable = 0;
                    if($is_avaiable==0){
                        $cou[] = array(
                            'coupon_code' => $coupon->coupon_code,
                            'coupon_condition' => $coupon->coupon_condition,
                            'coupon_number' => $coupon->coupon_number,

                        );
                        Session::put('coupon',$cou);
                    }
                }else{
                    $cou[] = array(
                            'coupon_code' => $coupon->coupon_code,
                            'coupon_condition' => $coupon->coupon_condition,
                            'coupon_number' => $coupon->coupon_number,

                        );
                    Session::put('coupon',$cou);
                }
                Session::save();
                return response()->json([
                    'success' => true,
                    'message' => 'Coupon Correct',
                    'data'    => $coupon
                ]);
            }

        }else{
            return response()->json([
                'success' => false,
                'message' => 'Coupon Incorrect',
                'data'    => null
            ]);
        }
    }   
}
