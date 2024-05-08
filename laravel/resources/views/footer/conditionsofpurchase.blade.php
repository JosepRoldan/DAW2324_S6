<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/Loopple/loopple-public-assets@main/motion-tailwind/motion-tailwind.css" rel="stylesheet">
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CustomAIze</title>
    @viteReactRefresh
    @vite('resources/js/app.js')
    @vite('resources/css/app.css')
    <link rel="icon" type="image/png" href="../img/logocompleto.png">
</head>



<body>
@extends($layout)

@section('content')

    <div class="container mx-auto py-10 px-5">
        <div class="max-w-6xl mx-auto bg-white text-gray-800 rounded-lg shadow-md overflow-hidden">
            <div class="p-4 sm:p-6">
                <div>
                    <h2 class="text-3xl text-center font-bold mb-10">Conditions of Prurchase</h2>
                    <h3 class="text-lg font-semibold mb-2">Title and General Contracting Conditions</h3>
                    <p class="mb-4">These General Contracting Conditions - hereinafter referred to as GCC - regulate the terms of purchase of various products offered on our website: www.customaize.com, owned by CustomAIze, a Spanish company, with VAT ID 554423411S, located at Carrer Madrid 35, Amposta, Spain.</p>
                    <p class="mb-4">Users making purchases on www.customaize.com fully accept these GCC and are bound by them, as if they were written at the time of contracting/purchase.</p>
                    <p class="mb-4">CustomAIze reserves the right to modify the GCC at any time and without prior notice. The GCC will always be accessible through the website, so that users can consult or print them at any time.</p>
                    <p class="mb-4">Prices and sales conditions are for informational purposes only and may be modified due to market fluctuations. However, placing an order by completing the purchase form implies agreement with the offered price and the current general sales conditions at that specific moment. Once the order is formalized, the purchase will be deemed completed with all the legal guarantees that protect the consumer purchaser, and from that moment, the prices and conditions will be contractual and cannot be modified without the express agreement of both parties. Spanish will be the language used to formalize the contract. The electronic document in which the contract is formalized will be archived, and the user will have access to it in their customer area.</p>
                    <p class="mb-4">CustomAIze reserves the right to deny and/or suspend access to the services provided on www.customaize.com for reasons of breach of good contractual faith, non-compliance with the applicable legislation, these General Purchase Conditions, and/or in cases of fraud detected by this company and/or any of its suppliers.</p>
                    <h3 class="text-lg font-semibold mb-2">Shipping</h3>
                    <p class="mb-4">Delivery times range from 24 to 72 hours at the customer's choice. We cannot guarantee these delivery times, although we strive for the transport companies to meet them whenever possible. In rural areas far from urban centers, delivery within 24 hours is not possible under any circumstances.</p>
                    <p class="mb-4">Delivery times depend on the availability of each product, which is indicated for each product offered. In orders that include multiple items, a single shipment will be made, and the delivery time will correspond to the item with the longest delivery time.</p>
                    <p class="mb-4">The customer will have 5 days to check the integrity of all components of the order and to ensure that everything that should be included in the products is included. After these 5 days, the shipment will be deemed accepted, and no claims for damages or faults with the shipment will be accepted.</p>
                    <p class="mb-4">An order will be considered delivered when the delivery receipt is signed by the customer. It is within the next 5 days that the customer must verify the products upon receipt and raise any objections that may exist.</p>
                    <p class="mb-4">In case of receiving a product damaged during transport, it is advisable to contact us within the first 24 hours to claim the incident with the transport company. Similarly, it is advisable to notify the transport company.</p>
                    <p class="mb-4">Redyser: 902 060 118</p>
                    <p class="mb-4">Tourline: 902 34 33 22</p>
                    <p class="mb-4">Seur: 902 10 10 10</p>
                    <p class="mb-4">Correos: 902 19 71 97</p>
                    <h3 class="text-lg font-semibold mb-2">Withdrawal</h3>
                    <p class="mb-4">For these purposes, PcComponentes informs that the Consolidated Text of the General Law for the Defense of Consumers and Users (TRLGDCU) establishes several options to exercise the right of withdrawal. Among them, it contemplates the possibility of doing so by filling out a form electronically. In order to shorten the times and so that you can make the return comfortably and without delays, PcComponentes advises you to use that option and fill out the withdrawal form.</p>
                    <p class="mb-4">In accordance with current legislation, it is possible to annul the contract concluded, without the need to justify such a decision and without any penalty of any kind, within a period of 14 natural days from the receipt of the goods by the customer. To do this, the conditions set out in this document must be met: withdrawal form.</p>
                    <p class="mb-4">The consumer will only be responsible for the decrease in value of the goods resulting from handling them differently than necessary to establish their nature, characteristics, or operation.</p>
                    <p class="mb-4">The right of withdrawal shall not apply to contracts relating to:</p>
                    <p class="mb-3">The provision of services, once the service has been fully performed, and if the contract imposes on the consumer or user an obligation to pay, when performance has begun, with the prior express consent of the consumer or user and with their knowledge that, once the trader has fully performed the contract, they will have lost their right of withdrawal.</p>
                    <p class="mb-3">The supply of goods or services whose price depends on fluctuations in the financial market that the trader cannot control and that may occur during the withdrawal period.</p>
                    <p class="mb-3">The supply of goods made to the consumer's specifications or clearly personalized.</p>
                    <p class="mb-3">The supply of goods that are liable to deteriorate or expire rapidly.</p>
                    <p class="mb-3">The supply of sealed goods which are not suitable for return due to health protection or hygiene reasons and which have been unsealed after delivery.</p>
                    <p class="mb-3">The supply of goods which are, after delivery, according to their nature, inseparably mixed with other items.</p>
                    <p class="mb-3">The supply of alcoholic beverages whose price has been agreed at the time of concluding the sales contract and which cannot be delivered before 30 days, and whose actual value depends on fluctuations in the market which the trader cannot control.</p>
                    <p class="mb-3">Contracts where the consumer and user has specifically requested the trader to visit them to carry out urgent repair or maintenance work; if, during that visit, the trader provides additional services that are specifically requested by the consumer or supplies goods other than spare parts necessary to carry out the maintenance or repair work, the right of withdrawal shall apply to those additional services or goods.</p>
                    <p class="mb-3">The supply of sealed audio or video recordings or sealed computer software which were unsealed by the consumer after delivery.</p>
                    <p class="mb-3">The supply of daily newspapers, periodicals, or magazines, with the exception of subscription contracts for the supply of such publications.</p>
                    <p class="mb-3">Contracts concluded at a public auction.</p>
                    <p class="mb-3">The supply of accommodation services for purposes other than residential purposes, transport of goods, car rental, food or services related to leisure activities, if the contracts provide for a specific date or period of performance.</p>
                    <p class="mb-3">The supply of digital content which is not supplied on a tangible medium when performance has begun with the consumer's prior express consent and their acknowledgment that they thereby lose their right of withdrawal; and.</p>
                    <p class="mb-3">The supply of digital content which is not supplied on a tangible medium, if the performance has begun with the consumer's prior express consent and their acknowledgment that they thereby lose their right of withdrawal, combined with the provision of confirmation under Article 98(7) or Article 99(2).</p>
                    <p class="mb-4">Once we receive the product(s), we will refund your money according to the payment method you used:</p>
                    <p class="mb-4">If you paid by card, we will refund it to your account within 48 to 72 hours.</p>
                    <p class="mb-4">If you paid by PayPal, we will refund it to your PayPal account.</p>
                    <p class="mb-4">If you paid by bank transfer, we will ask for an account number to make the refund. Please note that it may take up to 48 business hours for the refund to be reflected in your bank account.</p>
                    <p class="mb-4">If you paid by financing, we will proceed to make a total or partial cancellation of the financed amount as appropriate.</p>
                    <p class="mb-4">For other payment methods, we will ask for an account number to make the refund.</p>
                    <p class="mb-4">You will only be responsible for the decrease in value of the goods resulting from handling them differently than necessary to establish their nature, characteristics, or operation.</p>
                    <p class="mb-4">You will find more information about the return process in the "I want to make a return" section of the Support Center.</p>
                    <h3 class="text-lg font-semibold mb-2">Return Conditions for Individual Customers</h3>
                    <p class="mb-4">For products sold and delivered by PcComponentes, you can return your items for any reason without return costs, beyond the legally established period for exercising the right of withdrawal (14 natural days from delivery) up to the next 30 natural days from receiving your order. The return due to withdrawal will only be free for new and refurbished products sold and delivered by PcComponentes. The consumer will bear the direct costs of returning products in all other cases, particularly when it comes to products purchased from external sellers through the PcComponentes marketplace.</p>
                    <p class="mb-4">In order to avoid any type of damage during shipping, all merchandise must be returned in its original condition, in perfect condition and protected, avoiding stickers, seals, or adhesive tapes directly on the surface or packaging of the item.</p>
                    <p class="mb-4">Once the return request has been filled out and submitted, you will receive instructions on how to send it to our facilities in your email. You must send the goods without delay and always within the maximum period of 30 natural days from when you received your order.</p>
                    <p class="mb-4">Once the merchandise is received and verified to be in perfect condition, the refund will be processed. We will refund you the payment received, including the delivery cost, with the exception of additional costs resulting from your choice of a delivery method other than the least expensive standard delivery offered.</p>
                    <p class="mb-4">Return of products with gifts or promotions: It will be mandatory to return the complete pack (complete pack or item + gift) in order to proceed with the refund. In the case of products that include game download codes, it will be a requirement not to have downloaded it in order to proceed with the full refund. In the event that it has been downloaded, the amount of the game will be deducted from the total refund.</p>
                    <h3 class="text-lg font-semibold mb-2">Return Conditions for Distributors</h3>
                    <p class="mb-4">Only returns of material that is unopened and in perfect condition will be accepted, within 30 natural days after receiving it.</p>
                    <p class="mb-4">Promotions on the website that extend the delivery period beyond 30 days will not apply to distributors, who will always have a return period of 30 days.</p>
                    <p class="mb-4">Such returns will be processed as commercial returns since there is no law regulating the rights of return between companies, and such processing is regulated according to the conditions of PCCOMPONENTES.</p>
                    <p class="mb-4">Returns of products in blister or thermo-sealed packaging, and other products that have a broken factory security seal, will not be accepted; for example, motherboards with unsealed cables, monitors, printers, memory cards, etc.</p>
                    <p class="mb-4">These conditions do not invalidate the right to warranty or exchange defective products. PCCOMPONENTES reserves the right to deny the return in case of detecting any anomaly in the returned product.</p>
                    <h3 class="text-lg font-semibold mb-2">Guarantees</h3>
                    <p class="mb-4">The warranty does not cover defects caused by incorrect use of the product and/or manipulation of it differently than necessary to establish its nature, characteristics, or operation. In these cases, the consumer shall bear the cost of repair. Therefore, the following are excluded from the warranty:</p>
                    <p class="mb-4">Defects and damage caused by external events, accidents, mainly electrical accidents, wear and tear, and use not in accordance with the instructions of PCCOMPONENTES.</p>
                    <p class="mb-4">Products modified or repaired by the customer or any other person not authorized by PCCOMPONENTES, as well as products that are the subject of a specific support contract.</p>
                    <p class="mb-4">Incorrect software/hardware configuration by the customer of a computer, component, or peripheral. Incorrect software/hardware configuration or failure in a computer caused by a component not supplied by PCCOMPONENTES and incorporated by the customer.</p>
                    <p class="mb-4">Infection of computer viruses by the customer on computers, hard drives, or driver or additional software disks.</p>
                    <p class="mb-4">You can find all the information regarding product warranties in the warranty section.</p>
                    <h3 class="text-lg font-semibold mb-2">Order Cancellations</h3>
                    <p class="mb-4">Those order cancellations that involve a refund to the customer and are by bank transfer will have a maximum period of 30 days for administrative procedures, although we try to ensure that the period is not more than 7 days.</p>
                    <h3 class="text-lg font-semibold mb-2">Legal Bases of Contests</h3>
                    <p class="mb-4">All information regarding the legal bases of contests can be found here.</p>
                    <h3 class="text-lg font-semibold mb-2">Dispute Resolution</h3>
                    <p class="mb-4">Online dispute resolution in consumer matters in accordance with Art. 14.1 of Regulation (EU) 524/2013: The European Commission provides an online dispute resolution platform which is available at the following link: http://ec.europa.eu/consumers/odr/.</p>
                    <h3 class="text-lg font-semibold mb-2">Private Copy Compensation System</h3>
                    <p class="mb-4">Under Royal Decree-Law 12/2017 of July 3, which amends the consolidated text of the Intellectual Property Law, approved by Royal Legislative Decree 1/1996 of April 12, regarding the fair compensation system for private copying, PC COMPONENTES Y MULTIMEDIA, S.L.U. will have to charge, where applicable, compensation for the sale of those non-typographical products or devices, sold on www.pccomponentes.com, which, exclusively intended for private, non-professional or business use, reproduce works (books or similar publications, sound recordings, and video recordings) owned by third parties (publishers, producers of sound recordings and video recordings, performing artists...).</p>
                    <p class="mb-4">However, it is informed of the existence of a system of exemption and reimbursement of payment of these compensations, which is regulated in the new art. 25, points 7 and 8 of the Intellectual Property Law, modified by the aforementioned Royal Decree-Law 12/2017, which regulates the manner and requirements to justify the right to reimbursement for those individuals and legal entities exempted by law and/or those who, without being exempt, have proven to use the acquired product exclusively for professional use or for its export or intra-Community delivery.</p>
                    <p class="mb-4">In this sense, those exempted companies, professionals, self-employed workers, and public bodies must obligatorily prove to PcComponentes, through the certificates established by the Royal Decree-Law, that they are within the exemption cases in order to apply them legally.</p>
                    <p class="mb-4">More information can be found at the following link: http://www.boe.es/boe/dias/2017/07/04/pdfs/BOE-A-2017-7718.pdf</p>
                        <p class="text-1xl font-semibold leading-relaxed mt-12 mb-2">Updated: March 13, 2024</p>
                    </div>
                </div>
            </div>
    </div> 
    @endsection       
</body>




</html>



