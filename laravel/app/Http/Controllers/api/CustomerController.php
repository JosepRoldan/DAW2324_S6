<?php

namespace App\Http\Controllers\api;

use App\Models\Customer;
use Carbon\Carbon;
use Illuminate\Http\Request;
use App\Models\Order;



class CustomerController extends Controller
{
    /**
     * Retrieve a list of all customers.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(): \Illuminate\Http\JsonResponse
    {
        $customers = Customer::all();
        return response()->json($customers);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {




        // Validate the input data
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'surname' => 'required|max:255',
            'username' => 'required|max:255|unique:customers,username',
            'mail' => 'required|email|max:255|unique:customers,mail',
            'phone' => 'nullable|max:255',
            'address' => 'nullable|max:255',
            'city' => 'nullable|max:255',
            'postcode' => 'nullable|max:255',
            'idCountry' => 'nullable|integer|exists:countries,id',
            'is_validated' => 'sometimes|boolean',
            'status' => 'required|in:Active,Inactive,Banned,Deleted',
        ]);

        // Add the current date to the validated data
        $validatedData['membershipDate'] = now();

        // Create a new customer with the validated data
        $customer = Customer::create([
            'name' => $validatedData['name'],
            'surname' => $validatedData['surname'],
            'username' => $validatedData['username'],
            'password' => bcrypt('password'),
            'mail' => $validatedData['mail'],
            'city' => $validatedData['city'],
            'phone' => $validatedData['phone'],
            'address' => $validatedData['address'],
            'postcode' => $validatedData['postcode'],
            'idCountry' => 1,
            'is_validated' => $validatedData['is_validated'] ?? false,
            'membershipDate' => $validatedData['membershipDate'],
            'customerStatus' => $validatedData['status'],
        ]);

        // Return a JSON response with a message and the created customer
        return response()->json(
            ['message' => 'Customer created successfully', 'data' => $customer],
            201
        );
    }


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string $id ID of the customer to update
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, string $id)
    {
        /**
         * Validate the user input.
         *
         * @var array $validatedData Validated user input
         */
        $validatedData = $request->validate([
            'name' => 'required|max:255',
            'surname' => 'required|max:255,',
            'username' => 'required|max:255|unique:customers,username,' . $id,
            'mail' => 'required|email|max:255|unique:customers,mail,' . $id,
            'phone' => 'nullable|max:255',
            'address' => 'nullable|max:255',
            'city' => 'nullable|max:255',
            'postcode' => 'nullable|max:255',
            'idCountry' => 'nullable|integer|exists:countries,id',
            'is_validated' => 'sometimes|boolean',
            'status' => 'required|in:Active,Inactive,Banned,Deleted',
        ]);

        /**
         * Find the customer to update.
         *
         * @var App\Customer $customer Customer to update
         */
        $customer = Customer::find($id);

        /**
         * Update the customer with the validated input.
         */
        $customer->name = $validatedData['name'];
        $customer->surname = $validatedData['surname'];
        $customer->username = $validatedData['username'];
        $customer->mail = $validatedData['mail'];
        $customer->city = $validatedData['city'];
        $customer->phone = $validatedData['phone'];
        $customer->address = $validatedData['address'];
        $customer->postcode = $validatedData['postcode'];
        $customer->idCountry = $validatedData['idCountry'] ?? 1;
        $customer->is_validated = $validatedData['is_validated'] ?? false;
        $customer->customerStatus = $validatedData['status'];

        /**
         * Save the updated customer.
         */
        $customer->save();

        /**
         * Return a JSON response with a message and the updated customer.
         *
         * @var array $response JSON response
         */
        $response = [
            'message' => 'Customer updated successfully',
            'data' => $customer,
            'id' => $id,
        ];

        return response()->json($response, 200);
    }
    public function userOrders($customerId)
    {
        // Buscar al cliente por su ID
        $customer = Customer::findOrFail($customerId);

        // Obtener todos los pedidos asociados al cliente
        $orders = Order::where('idCustomers', $customerId)->get();

        // Retornar los pedidos del cliente
        return response()->json(['customer' => $customer, 'orders' => $orders]);
    }

    /**
     * Remove the specified resource from storage.
     */

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id ID of the customer to delete
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        /**
         * Find the customer to delete.
         *
         * @var App\Customer $customer Customer to delete
         */
        $customer = Customer::find($id);

        /**
         * Check if the customer exists.
         */
        if ($customer) {
            /**
             * Delete the customer.
             */
            $customer->delete();

            /**
             * Return a success message.
             *
             * @var array $response JSON response
             */
            $response = [
                'message' => 'Customer deleted successfully',
            ];

            return response()->json($response, 200);
        } else {
            /**
             * Return an error message if the customer does not exist.
             *
             * @var array $response JSON response
             */
            $response = [
                'message' => 'Customer not found',
            ];

            return response()->json($response, 404);
        }
    }
}
