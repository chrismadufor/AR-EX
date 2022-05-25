if (paymentOption == 'paystack') {

    //config data
    var configData = {"payments":{"gateway_configuration":{"paypal":{"enable":false,"testMode":false,"gateway":"Paypal","paypalSandboxBusinessEmail":"","paypalProductionBusinessEmail":"","currency":"USD","currencySymbol":"$","paypalSandboxUrl":"https:\/\/www.sandbox.paypal.com\/cgi-bin\/webscr","paypalProdUrl":"https:\/\/www.paypal.com\/cgi-bin\/webscr","notifyIpnURl":"payment-response.php","cancelReturn":"payment-response.php","callbackUrl":"payment-response.php","privateItems":[]},"paytm":{"enable":false,"testMode":false,"gateway":"Paytm","currency":"INR","currencySymbol":"\u20b9","paytmMerchantTestingMidKey":"","paytmMerchantLiveMidKey":"","industryTypeID":"Retail","channelID":"WEB","website":"WEBSTAGING","paytmTxnUrl":"https:\/\/securegw-stage.paytm.in\/theia\/processTransaction","callbackUrl":"payment-response.php"},"instamojo":{"enable":false,"testMode":false,"gateway":"Instamojo","currency":"INR","currencySymbol":"\u20b9","sendEmail":false,"webhook":"http:\/\/instamojo.com\/webhook\/","callbackUrl":"payment-response.php"},"paystack":{"enable":true,"testMode":true,"gateway":"Paystack","currency":"NGN","currencySymbol":"\u20a6","paystackTestingPublicKey":"","paystackLivePublicKey":"pk_live_15824dbab9a330c7285e69b81db4db6a7168c0377","callbackUrl":"payment-response.php"},"stripe":{"enable":false,"testMode":false,"gateway":"Stripe","locale":"auto","allowRememberMe":true,"currency":"USD","currencySymbol":"$","stripeTestingPublishKey":"","stripeLivePublishKey":"pk_live_15824dbab9a330c7285e69b81db4db6a7168c0377","callbackUrl":"payment-response.php"},"razorpay":{"enable":false,"testMode":false,"gateway":"Razorpay","merchantname":null,"themeColor":"#4CAF50","currency":"INR","currencySymbol":"\u20b9","razorpayTestingkeyId":"","razorpayLivekeyId":"","callbackUrl":"payment-response.php"},"iyzico":{"enable":false,"testMode":false,"gateway":"Iyzico","conversation_id":"CONVERS628cd25d804a6","currency":"TRY","currencySymbol":"\u20ba","subjectType":1,"txnType":2,"subscriptionPlanType":1,"iyzicoSandboxModeUrl":"https:\/\/sandbox-api.iyzipay.com","iyzicoProductionModeUrl":"https:\/\/api.iyzipay.com","callbackUrl":"payment-response.php"},"authorize-net":{"enable":false,"testMode":false,"gateway":"Authorize.net","reference_id":"REF628cd25d805b8","currency":"USD","currencySymbol":"$","type":"individual","txnType":"authCaptureTransaction","callbackUrl":"payment-response.php"},"bitpay":{"enable":false,"testMode":false,"notificationEmail":null,"gateway":"BitPay","currency":"USD","currencySymbol":"$","callbackUrl":"payment-response.php"},"mercadopago":{"enable":false,"testMode":false,"gateway":"Mercado Pago","currency":"USD","currencySymbol":"$","callbackUrl":"payment-response.php"},"payumoney":{"enable":false,"testMode":false,"gateway":"PayUmoney","currency":"INR","currencySymbol":"\u20b9","txnId":"Txn6794191","callbackUrl":"payment-response.php","checkoutColor":"e34524","checkoutLogo":"http:\/\/boltiswatching.com\/wp-content\/uploads\/2015\/09\/Bolt-Logo-e14421724859591.png"},"mollie":{"enable":false,"testMode":false,"gateway":"Mollie","currency":"USD","currencySymbol":"$","callbackUrl":"payment-response.php"},"fortumo":{"enable":false,"testMode":false,"gateway":"SMS","paypalSandboxBusinessEmail":"","paypalProductionBusinessEmail":"","currency":"USD","currencySymbol":"$","notifyIpnURl":"payment-response.php","cancelReturn":"payment-response.php","callbackUrl":"payment-response.php","privateItems":[]}}}},
        paymentPagePath = "https:\/\/datemev.usgrantsassist.com\/pay\/",
        configItem = configData['payments']['gateway_configuration']['paystack'],
        paystackCallbackUrl = configItem.callbackUrl,
        userDetails = {"amounts":{"USD":10,"INR":774.700000000000045474735088646411895751953125,"NGN":3635,"TRY":158.69999999999998863131622783839702606201171875,"EUR":9.3800000000000007815970093361102044582366943359375},"order_id":"628cd25d7f9e7","order_type":"credits","order_package":"0","customer_id":"1","item_name":"1000 Credits","item_qty":1,"item_id":"ITEM628cd25d7f9ed","payer_email":"admin@admin.com","payer_name":"UKGAMER","payer_mobile":"9999999999","description":"1000 Credits - datemev","ip_address":"197.210.70.71","address":"3234 Aligar Street Bali","city":"Cali","country":"United Kingdom"};
        
        const amount =  userDetails['amounts'][configItem['currency']];

    var paystackPublicKey = '';
    
    //check paystack test or production mode
    if (configItem['testMode']) {
        paystackPublicKey = configItem['paystackTestingPublicKey'];
    } else {
        paystackPublicKey = configItem['paystackLivePublicKey'];
    }

    var paystackAmount = amount.toFixed(2) * 100,
        handler = PaystackPop.setup({
        key: paystackPublicKey, // add paystack public key
        email: userDetails['payer_email'], // add customer email
        amount: paystackAmount, // add order amount
        currency: configItem['currency'], // add currency
        callback: function(response){
            // after successful paid amount return paystack reference Id
            var paystackReferenceId = response.reference;

            //show loader before ajax request
            $(".lw-show-till-loading").show();

            var paystackData = {
                'paystackReferenceId': paystackReferenceId,
                'paystackAmount': paystackAmount
            };

            var paystackData = $('#lwPaymentForm').serialize() + '&' + $.param(userDetails) + '&' + $.param(paystackData);

            $.ajax({
                type: 'post', //form method
                context: this,
                url: 'payment-process.php', // post data url
                dataType: "JSON",
                data: paystackData, // form serialize data
                error: function (err) {
                    var error = err.responseText
                        string = '';
                    
                    //on error show alert message
                    string += '<div class="alert alert-danger" role="alert">'+err.responseText+'</div>';

                    $('#lwValidationMessage').html(string);
                    //alert("AJAX error in request: " + JSON.stringify(err.responseText, null, 2));

                    //hide loader after ajax request complete
                    $(".lw-show-till-loading").hide();
                },
                success: function (response) {
                    if (response.status == true) {
                        $('body').html("<form action='"+paystackCallbackUrl+"' method='post'><input type='hidden' name='response' value='"+JSON.stringify(response)+"'><input type='hidden' name='paymentOption' value='paystack'></form>");
                        $('body form').submit();
                    }
                }
            });

        },
        onClose: function(){
            //on close paystack inline widget then load back to checkout form page
           // window.location.href = paymentPagePath;
        }
    });

    //open paystack inline widen using iframe
    handler.openIframe();
// Paystack script for send ajax request to server side end