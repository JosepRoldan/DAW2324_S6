import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function PayPalCheckout() {
    const totalAmount = document.getElementById("totalAmount").value;
    const orderId = document.getElementById("orderId").value;

    console.log(orderId);
    const [paymentCompleted, setPaymentCompleted] = useState(false);

    function createOrder(data, actions) {
        return actions.order.create({
            purchase_units: [
                {
                    reference_id: orderId,
                    amount: {
                        currency_code: "EUR",
                        value: totalAmount,
                    },
                    shipping: {
                        name: {
                            full_name: "Perico Palotes",
                        },
                        address: {
                            address_line_1: "C/Madrid 35",
                            admin_area_2: "Amposta",
                            admin_area_1: "Tarragona",
                            postal_code: "43870",
                            country_code: "ES",
                        },
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
                            {
                                (window.location.href =
                                    "/shopProccess/success?orderId=" + orderId)
                            }
                            <p>Tu pago se ha completado exitosamente.</p>
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
