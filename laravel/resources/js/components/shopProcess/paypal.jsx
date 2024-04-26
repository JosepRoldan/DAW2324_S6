import React from "react";
import { createRoot } from "react-dom/client";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

function PayPalCheckout() {
    const totalAmount = parseFloat(
        document.getElementById("data").getAttribute("data"),
    );
    console.log(totalAmount);

    function createOrder(data, actions) {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: totalAmount.toFixed(2), // Importe total a cobrar por PayPal
                        currency_code: "EUR", // Código de la moneda (puede variar según tu configuración)
                    },
                },
            ],
        });
    }

    function onApprove(data, actions) {
        alert(`Transaction completed by ${totalAmount}`);
        // Redirigir a otra ruta después de que la transacción se haya completado con éxito
        window.location.href = "/Inicio";
        // Cerrar la ventana de PayPal
    }

    return (
        <PayPalScriptProvider
            options={{
                "client-id":
                    "AUZhCdtjShVz3aPj-29oznCc8DHaY-fRbD9_83qAsarySyCRtDA41lKfkHC-PWglj8mC4YospxgDWzTX",
                currency: "EUR", // Especificar la moneda aquí
            }}
        >
            <PayPalButtons
                createOrder={(data, actions) => createOrder(data, actions)}
                onApprove={onApprove}
            />
        </PayPalScriptProvider>
    );
}

const rootElement = document.getElementById("paypal");
if (rootElement) {
    createRoot(rootElement).render(<PayPalCheckout />);
}
