import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function PayPalCheckout() {
    const totalAmount = parseFloat(
        document.getElementById("data").getAttribute("data"),
    );
    console.log(totalAmount);
    const accessToken = "REPLACE_WITH_YOUR_ACCESS_TOKEN";
    const [paymentCompleted, setPaymentCompleted] = useState(false);

    function createOrder(data, actions) {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code: "EUR",
                        value: totalAmount,
                    },
                },
            ],
        });
    }

    function onApprove(data, actions) {
        return actions.order.capture().then(function (details) {
            setPaymentCompleted(true);
            // Redirigir a la página de inicio u otra página después del pago exitoso
        });
    }

    return (
        <PayPalScriptProvider
            options={{
                "client-id":
                    "AUZhCdtjShVz3aPj-29oznCc8DHaY-fRbD9_83qAsarySyCRtDA41lKfkHC-PWglj8mC4YospxgDWzTX",
                currency: "EUR", // Especificar la moneda aquí
            }}
        >
            <div className="container mx-auto mr-12 p-12">
                <div className="justify-center items-center mx-auto">
                    {!paymentCompleted && (
                        <PayPalButtons
                            createOrder={(data, actions) =>
                                createOrder(data, actions)
                            }
                            onApprove={(data, actions) =>
                                onApprove(data, actions)
                            }
                            style={{
                                color: "gold",
                                shape: "rect",
                                label: "paypal",
                                tagline: false,
                            }}
                        />
                    )}
                    {paymentCompleted && (
                        <div>
                            <p>Tu pago se ha completado exitosamente.</p>
                            {/* Aquí puedes agregar más contenido o redirigir al usuario */}
                        </div>
                    )}
                </div>
            </div>
        </PayPalScriptProvider>
    );
}

const rootElement = document.getElementById("paypal");
if (rootElement) {
    createRoot(rootElement).render(<PayPalCheckout />);
}
