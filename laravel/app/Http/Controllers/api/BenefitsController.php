<?php

namespace App\Http\Controllers\api;

use Exception;
use Illuminate\Http\Request;
use App\Models\Benefits;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class BenefitsController extends Controller
{
    /**
     * retruns all benefits
     *
     * @param datatype $paramname description
     * @throws Some_Exception_Class description of exception
     * @return Some_Return_Value
     */
    public function index()
    {   
        $userId = Auth::id();
        $userRole = User::find($userId)->role;
        
         // Verificar el rol del usuario y decidir si mostrar la sección de beneficios
        if ($userRole->id === 3) {
            // El usuario tiene un rol que no permite mostrar la sección de beneficios
            return response()->json(['message' => 'No tiene permiso para ver la sección de beneficios'], 403);
        } 
        if ($userRole->id === 2){
            $customerManager = true;
            $benefits = Benefits::all();
            $currentYear = date('Y');
            $total = DB::table('benefits')
                ->whereYear('created_at', $currentYear)
                ->sum('profit');

            return response()->json(['benefits' => $benefits, 'total' => $total, 'customerManager' => $customerManager]);
        } 
        else {
            // El usuario tiene un rol que permite mostrar la sección de beneficios
            $benefits = Benefits::all();
            $currentYear = date('Y');
            $total = DB::table('benefits')
                ->whereYear('created_at', $currentYear)
                ->sum('profit');

            return response()->json(['benefits' => $benefits, 'total' => $total]);
        }
    }

    /**
     * Deletes a resource with the given ID.
     *
     * @param int $id The ID of the resource to be deleted.
     * @throws ModelNotFoundException If the resource with the given ID is not found.
     * @return \Illuminate\Http\JsonResponse The JSON response indicating the success of the deletion.
     */
    public function delete($id)
    {
        $benefit = Benefits::findOrFail($id);
        $benefit->delete();
        return response()->json(['message' => 'Resource deleted successfully'], 200);
    }

    /**
     * Creates a new benefit record in the database.
     *
     * @param Request $request The HTTP request object containing the data for the new benefit.
     * @throws Some_Exception_Class If the validation of the request data fails.
     * @return \Illuminate\Http\JsonResponse The JSON response containing the result of the operation.
     */
    public function create(Request $request)
    {
        $request->validate([
            'month' => 'required',
            'income' => 'required|numeric',
            'expense' => 'required|numeric',
            'profit' => 'required|numeric',
            'year' => 'required',
        ]);

        $existingRecord = DB::select("SELECT * FROM benefits WHERE year = ? AND month = ?", [$request->year, $request->month]);

        if (count($existingRecord) > 0) {
            return response()->json(['message' => $existingRecord], 409);
            // return response()->json(['message' => 'Year and month already exist'], 409);
        } else {

            $benefit = Benefits::create([
                'month' => $request->month,
                'income' => $request->income,
                'expense' => $request->expense,
                'profit' => $request->profit,
                'year' => $request->year,
            ]);

            return response()->json(['message' => 'Benefit created successfully', 'benefit' => $benefit], 201);
        }
    }

    /**
     * Retrieve a specific benefit by ID and return it as a JSON response.
     *
     * @param datatype $id description
     * @throws Some_Exception_Class description of exception
     * @return Some_Return_Value
     */
    public function getOne($id)
    {
        $benefit = Benefits::findOrFail($id);
        return response()->json($benefit);
    }
    /**
     * Update a benefit record based on the provided request data.
     *
     * @param Request $request The request containing the data to update the benefit record
     * @throws ModelNotFoundException if the benefit record is not found
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request)
    {
        $request->validate([
            'idBenefit' => 'required',
            'month' => 'required',
            'income' => 'required|numeric',
            'expense' => 'required|numeric',
            'profit' => 'required|numeric',
        ]);

        $benefit = Benefits::findOrFail($request->input('idBenefit'));

        $benefit->update([
            'month' => $request->input('month'),
            'income' => $request->input('income'),
            'expense' => $request->input('expense'),
            'profit' => $request->input('profit'),
        ]);

        return response()->json(['message' => 'Benefit updated successfully', 'data' => $benefit]);
    }

    /**
     * Retrieves all years from the Benefits table and returns them as a JSON response.
     *
     * @return Some_Return_Value
     */
    public function getAllYears()
    {
        $year = Benefits::select('year')->distinct()->get();
        $benefits = [];
        foreach ($year as $year) {
            $benefits[] = $year->year;
        }

        return response()->json($benefits);
    }

    /**
     * Get benefits by year.
     *
     * @param datatype $id description
     * @throws Some_Exception_Class description of exception
     * @return Some_Return_Value
     */
    public function getBenefitsByYear($id)
    {
        $benefits = Benefits::where('year', $id)->get();
        return response()->json($benefits);
    }
}
