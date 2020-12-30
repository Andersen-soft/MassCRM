<?php

namespace App\Http\Controllers\v1\Location;

use App\Http\Controllers\Controller;
use App\Models\Location\Location;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class LocationController extends Controller
{
    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Location $location
     * @return Response
     */
    public function update(Request $request, Location $location): JsonResponse
    {
        return $this->success();
    }
}
