import React from "react";
import { createRoot } from "react-dom/client";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function PayPalCheckout() {
    const totalAmount = parseFloat(
        document.getElementById("data").getAttribute("data"),
    );
    console.log(totalAmount);
    const accessToken = "REPLACE_WITH_YOUR_ACCESS_TOKEN";

    function createOrder(data, actions) {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code: "EUR",
                        value: totalAmount,
                    },
                    payment_source: {
                        paypal: {
                            experience_context: {
                                brand_name: "EXAMPLE INC",
                                locale: "en-US",
                                user_action: "PAY_NOW",
                                return_url: "https://example.com/returnUrl",
                                cancel_url: "https://example.com/cancelUrl",
                            },
                        },
                    },
                },
            ],
        });
    }

    function onApprove(data, actions) {
        return actions.order.capture().then(function (details) {
            alert(`Transaction completed by ${totalAmount}`);
            // Redirigir a otra ruta después de que la transacción se haya completado con éxito
            window.location.href = "/Inicio";
            // Cerrar la ventana de PayPal
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
                    <PayPalButtons
                        createOrder={(data, actions) =>
                            createOrder(data, actions)
                        }
                        onApprove={(data, actions) => onApprove(data, actions)}
                        style={{
                            color: "gold",
                            shape: "rect",
                            label: "paypal",
                            tagline: false,
                        }} // Estilos personalizados para los botones PayPal
                    />
                </div>
            </div>
        </PayPalScriptProvider>
    );
}

const rootElement = document.getElementById("paypal");
if (rootElement) {
    createRoot(rootElement).render(<PayPalCheckout />);
}
