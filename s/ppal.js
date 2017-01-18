layer.config({
  extend: 'espresso/style.css',
  skin: 'layer-ext-espresso'
});
var itemtitle = $('.title')[0].innerText;

    paypal.Button.render({

        //env: 'sandbox',
        style: {
            size: 'medium',
            color: 'blue',
            shape: 'rect'
        },
        client: {
            sandbox:    'AcDQCVjY6L7aT8uVbI5KTDvLjCS2tWbaEf311dKD4TsZkxJnzDMViZiwcR0fudW3tjVo_PPrCX8ch3Bk',
            production: 'AQf45i5gjDQnQxJ6zxIMraC8NOM_NSZvLAXwLSPJNx7-QjA3VKh6TG7wcm04V3RMur1dGwehWRYUAEcT'
        },

        payment: function() {

            var env    = this.props.env;
            var client = this.props.client;

            return paypal.rest.payment.create(env, client, {
                transactions: [
                    {
                        amount: { total: '49.00', currency: 'USD' },
                        "item_list": {
                          "items": [
                            {
                            "description": "picture frame",
                            "name": "decoframe -"+itemtitle,

                            "quantity": "1",
                            "price": "49",

                            "currency": "USD"
                            }
                          ]
                        }
                    }
                ]
            });
        },

        commit: true, // Optional: show a 'Pay Now' button in the checkout flow

        onAuthorize: function(data, actions) {

            // Optional: display a confirmation page here
            //console.log(data);
            //console.log(actions);
            actions.payment.get().then(function(ret){
              console.log('>>>>>>>>>>>>>>>');
              console.log(ret);
            });
            return actions.payment.execute().then(function() {
                // Show a success page to the buyer
                //document.location = "http://chaolan.info";



                layer.open({
                  type: 0,
                  title: 'SUCCESS'
                  ,btnAlign: 'c'
                  ,btn: 'OK'
                  ,icon: 1
                  ,content: '<div>Thank you! We will deliver the item<br> in serveral days. And the tracking<br> number will be sent to your email.</div>'
                });
            });
        }

    }, '#paypal-button');
