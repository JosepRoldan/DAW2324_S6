<?php

namespace Tests\Unit;

use Illuminate\Http\Request;
use Illuminate\View\View;
use Tests\TestCase;

class BuyingProcessControllerTest extends TestCase
{ 
/** @test */
public function it_should_return_guess_view()
{
    // Create a fake request for the '/Cart/Shipping/guess' route
    $request = Request::create('/Cart/Shipping/guess', 'GET');

    // Call the route directly
    $response = app()->handle($request);

    // Get the view from the response
    $view = $response->getOriginalContent();

    // Get the name of the view
    $viewName = $view->getName();

    // Verify that the view name is as expected
    $this->assertEquals('processShop.guess', $viewName);
}

}
