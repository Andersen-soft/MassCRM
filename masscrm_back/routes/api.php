<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('contact/reports/download', 'Report\ReportController@download');
Route::group(['prefix' => 'users'], static function () {
    Route::get('token', 'User\UserController@getUserFromToken');
    Route::post('set-password', 'User\UserController@setPassword');
});
Route::group(['prefix' => 'auth'], static function () {
    Route::post('login', 'Auth\AuthController@login');
});

Route::group(['middleware' => 'auth.jwt'], static function () {
    Route::group(['prefix' => 'filters'], function () {
        Route::get('/', 'Filter\FilterController@index')->name('filters');
        Route::get('industries', 'Filter\FilterController@industries')
            ->name('filters.industries');
    });
    Route::group(['prefix' => 'import'], function () {
        Route::post('upload-file', 'Import\ImportContactsController@uploadFile')
            ->name('import.upload-file');
        Route::post('start-parse', 'Import\ImportContactsController@startParse')
            ->name('import.start-parse');
        Route::get('status', 'Import\ImportContactsController@getStatus');
        Route::get('statistic', 'Import\ImportContactsController@getStatisticImport');
    });
    Route::group(['prefix' => 'contacts'], static function () {
        Route::post('delete-list', 'Contact\ContactController@destroyMany')
            ->name('contacts.destroy-list');
        Route::get('counter-daily-plan', 'Contact\ContactController@getCounterDailyPlan');
        Route::get('previous-companies/{id}', 'Contact\ContactController@getPreviousCompanies');
    });

    Route::group(['prefix' => 'attachment-files'], static function () {
        Route::get('contact/check-exist', 'AttachmentFile\AttachmentFileContactController@checkExistFile');
        Route::get('company/check-exist', 'AttachmentFile\AttachmentFileCompanyController@checkExistFile');
    });
    Route::resource('attachment-files/contact', 'AttachmentFile\AttachmentFileContactController')
        ->only('store', 'index', 'destroy');
    Route::resource('attachment-files/company', 'AttachmentFile\AttachmentFileCompanyController')
        ->only('store', 'index', 'destroy');
    Route::group(['prefix' => 'activity-log'], static function () {
        Route::get('contact', 'ActivityLog\ActivityLogContactController@show');
        Route::get('company', 'ActivityLog\ActivityLogCompanyController@show');
    });
    Route::resource('contacts', 'Contact\ContactController')
        ->only('store', 'update', 'index', 'show', 'destroy');
    Route::resource('companies', 'Company\CompanyController')
        ->only('store', 'update', 'index', 'show', 'destroy');
    Route::group(['prefix' => 'companies'], function () {
        Route::post('delete-list', 'Company\CompanyController@destroyMany')
            ->name('companies.destroy-list');
    });
    Route::group(['prefix' => 'users'], static function () {
        Route::get('ldap_user', 'User\LdapUserController');
        Route::get('roles', 'User\UserController@getRoles');
        Route::get('change-password/{id}', 'User\UserController@changePassword');
        Route::get('notifications', 'User\UserNotificationController@index');
        Route::put('notifications/{id}', 'User\UserNotificationController@update');
    });
    Route::resource('users', 'User\UserController')
        ->only('store', 'update', 'show', 'index');

    Route::group(['prefix' => 'countries'], static function () {
        Route::get('/', 'Country\CountryController@countries')->name('country');
        Route::get('{code}/regions', 'Country\CountryController@regions')->name('region');
        Route::get('regions/{code}', 'Country\CountryController@cities')->name('city');
    });

    Route::group(['prefix' => 'auth'], static function () {
        Route::get('logout', 'Auth\AuthController@logout');
        Route::get('refresh', 'Auth\AuthController@refresh');
        Route::get('user', 'Auth\AuthController@user');
    });
    Route::group(['prefix' => 'file'], static function () {
        Route::get('get', 'File\FileController@getFile');
    });

    Route::resource('blacklists', 'Blacklist\BlacklistController')
        ->only('store', 'update', 'index');
    Route::group(['prefix' => 'blacklists'], static function () {
        Route::get('export', 'Blacklist\BlacklistController@export');
        Route::post('delete', 'Blacklist\BlacklistController@destroy');
    });

    Route::resource('export/processes', 'Export\ProcessController')
        ->only('index');
});
