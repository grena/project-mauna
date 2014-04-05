<?php

class SettlerController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index($idUser)
	{
	    $user = User::find($idUser);

	    if ($user) {
	        return Response::json($user->settlers, 200);
	    }

	    return Response::json([
	        'flash'     => "Erreur",
	        'dev_error' => sprintf('User not found with idUser = %d', $idUser)
	    ], 400);
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
	public function create($idUser)
	{
		//
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store($idUser)
	{
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($idUser, $id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($idUser, $id)
	{
		//
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($idUser, $id)
	{
		//
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($idUser, $id)
	{
		//
	}

}