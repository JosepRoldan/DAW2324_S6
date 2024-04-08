<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>CustomAIze</title>
    @viteReactRefresh
    @vite('resources/js/app.js')
    @vite('resources/css/app.css')
    <link rel="icon" type="image/png" href="../img/logocompleto.png">
</head>
<!-- <div class="text-red-500" id="head"></div> -->

<body>
<div id="header"></div> 
<div class="container mx-auto py-10 px-5">
        <div class="max-w-6xl mx-auto bg-white text-gray-800 rounded-lg shadow-md overflow-hidden">
            <div class="p-4 sm:p-6">
                <div>
                    <h2 class="text-3xl text-center font-bold mb-10">Legal Notice</h2>
                    <h3 class="text-lg font-semibold mb-2">CustomAIze - Identifying Information</h3>
                    <p class="mb-4">In compliance with the information duty established in Article 10 of Law 34/2002, of July 11, on Information Society Services and Electronic Commerce, we hereby inform you:</p>
                    <p class="mb-4">CustomAIze is a company dedicated to providing customized AI solutions.</p>
                    <p class="mb-4">CustomAIze is registered in the Business Registry of [Your Region], under Volume [Volume Number], Book [Book Number], Folio [Folio Number], Sheet [Sheet Number], Entry [Entry Number].</p>
                    <p class="mb-4">CustomAIze, with VAT ID [Your VAT ID], is a company domiciled for the purposes of this information at [Your Address], and is currently responsible for the operation, management, and functioning of the website www.customaize.com. Other contact information we provide: Support Center, I want to send an inquiry.</p>
                    <p class="mb-4">Contact Email: support@customaize.com</p>
                    <p class="mb-4">CustomAIze is registered in the Registry of Electrical and Electronic Devices of the Ministry of Industry, Tourism, and Trade (RII-AEE) under number [Registration Number].</p>
                    <h3 class="text-lg font-semibold mb-2">Users</h3>
                    <p class="mb-4">Accessing and/or using this portal attributes the status of USER, who accepts, from such access and/or use, the General Conditions of Use reflected here. These Conditions will apply regardless of any General Contract Conditions that may be obligatory.</p>
                    <h3 class="text-lg font-semibold mb-2">Portal Usage</h3>
                    <p class="mb-4">www.customaize.com provides access to a multitude of products, information, services, programs, or data (hereinafter, "the content") on the internet belonging to CustomAIze or third parties that the USER may have access to. The USER assumes responsibility for the use of the portal, including any necessary registration to access certain services or content. In such registration, the USER will be responsible for providing truthful and lawful information. As a result of this registration, the USER may be provided with a password, for which they will be responsible, committing to its diligent and confidential use. The USER agrees to make appropriate use of the content and services that CustomAIze offers through its portal, including but not limited to:</p>
                    <p class="mb-4">Engaging in illegal activities, contrary to good faith and public order.</p>
                    <p class="mb-4">Disseminating content or propaganda of a racist, xenophobic, illegal pornographic nature, promoting terrorism, or violating human rights.</p>
                    <p class="mb-4">Causing damage to the physical and logical systems of CustomAIze, its suppliers, or third parties, introducing or spreading computer viruses or any other physical or logical systems that may cause the aforementioned damages;</p>
                    <p class="mb-4">Attempting to access and, where appropriate, use other users' email accounts and modify or manipulate their messages.</p>
                    <h3 class="text-lg font-semibold mb-2">Intellectual and Industrial Property</h3>
                    <p class="mb-4">All distinctive signs, trademarks, trade names, content, structure, design, and presentation of elements, and any other information appearing on this website are the property of CustomAIze or its assignors and are protected by industrial and intellectual property rights.</p>
                    <p class="mb-4">The USER is prohibited from reproducing, transforming, distributing, publicly communicating, or, in general, exploiting the elements referred to in the previous section without the express authorization of CustomAIze.</p>
                    <p class="mb-4">The USER shall refrain from using means that may delete, alter, bypass, or manipulate any protection devices or security systems that may be installed and may entail a risk or damage or disablement of the website and/or its contents.</p>
                    <p class="mb-4">CustomAIze is not responsible for any inappropriate use that third parties may make of this website, nor for the information they may transmit to third parties through it. The use of the content by the user and any resulting consequences, damages, or harms are the sole responsibility of the user. CustomAIze excludes itself from any damages and losses of all kinds caused to users by the use of links, directories, and search tools that allow users to access websites belonging to and/or managed by third parties, as well as the presence of viruses or other malicious codes in the content that may cause any type of damage to users' computer systems, electronic documents, or files. CustomAIze reserves the right to take legal action it deems appropriate against any unlawful use by third parties of the content of its website.</p>
                    <h3 class="text-lg font-semibold mb-2">Exclusion of Guarantees and Liability</h3>
                    <p class="mb-4">CustomAIze shall not be liable, in any case, for any damages of any kind that may be caused, including but not limited to: errors or omissions in the content, lack of availability of the portal, or transmission of viruses or harmful or malicious programs in the content, despite having taken all necessary technological measures to prevent it.</p>
                    <h3 class="text-lg font-semibold mb-2">Modifications</h3>
                    <p class="mb-4">CustomAIze reserves the right to make any modifications it deems appropriate to its portal without prior notice, including changing, removing, or adding both the content and services provided through it, as well as the way in which they are presented or located on its portal.</p>
                    <h3 class="text-lg font-semibold mb-2">Links</h3>
                    <p class="mb-4">In the event that links or hyperlinks to other websites are provided under the domain name, CustomAIze shall not exercise any control over such sites and content. In no case shall CustomAIze assume any responsibility for the content of any link belonging to a third-party website, nor shall it guarantee the technical availability, quality, reliability, accuracy, breadth, truthfulness, validity, or constitutionality of any material or information contained in any such hyperlinks or other websites. Likewise, the inclusion of these external connections shall not imply any association, merger, or participation with the connected entities.</p>
                    <h3 class="text-lg font-semibold mb-2">Right of Exclusion</h3>
                    <p class="mb-4">CustomAIze reserves the right to deny or withdraw access to the portal and/or the services offered without prior notice, at its own request or that of a third party, to those users who fail to comply with the General Conditions of Use.</p>
                    <h3 class="text-lg font-semibold mb-2">General</h3>
                    <p class="mb-4">CustomAIze will pursue the breach of the conditions as well as any misuse of its portal by exercising all civil and criminal actions that may correspond to it in law.</p>
                    <h3 class="text-lg font-semibold mb-2">Modification of the Present Conditions and Duration</h3>
                    <p class="mb-4">CustomAIze may modify the conditions set forth herein at any time, duly published as they appear here.</p>
                    <h3 class="text-lg font-semibold mb-2">Applicable Law and Jurisdiction</h3>
                    <p class="mb-4">The relationship between CustomAIze and the USER shall be governed by current Spanish regulations, and any dispute shall be submitted to the Spanish Courts and Tribunals.</p>
                    <h3 class="text-lg font-semibold mb-2">Online Dispute Resolution</h3>
                    <p class="mb-4">Online dispute resolution in consumer matters in accordance with Art. 14.1 of Regulation (EU) 524/2013: The European Commission provides an online dispute resolution platform which is available at the following link: http://ec.europa.eu/consumers/odr/.</p>
                </div>
            </div>
        </div>
    </div>
<div id="footer"></div>
</body>


</html>

