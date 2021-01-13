<?php

declare(strict_types=1);

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

Route::group(['prefix' => config('app.api_version'), 'namespace' => config('app.api_version')], function () {
    Route::post('contact/reports/download', 'Report\ReportController@download');

    Route::group(['prefix' => 'users'], function () {
        Route::get('token', 'User\UserController@getUserFromToken');
        Route::post('set-password', 'User\UserController@setPassword');
    });
    Route::group(['prefix' => 'auth'], function () {
        Route::post('login', 'Auth\AuthController@login');
    });

    Route::group(['middleware' => 'auth.jwt'], function () {
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
        Route::group(['prefix' => 'contacts'], function () {
            Route::post('delete-list', 'Contact\ContactController@destroyMany')
                ->name('contacts.destroy-list');
            Route::get('counter-daily-plan', 'Contact\ContactController@getCounterDailyPlan');
            Route::put('change-responsible', 'Contact\ContactController@changeResponsible');
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

        Route::resource('vacancies','Vacancy\VacancyController')
            ->only('destroy');

        Route::group(['prefix' => 'countries'], function () {
            Route::get('/', 'Country\CountryController@countries')->name('country');
            Route::get('{code}/regions', 'Country\CountryController@regions')->name('region');
            Route::get('regions/{code}', 'Country\CountryController@cities')->name('city');
            Route::post('cities', 'Country\CountryController@addCities')->name('location');
        });

        Route::group(['prefix' => 'auth'], function () {
            Route::get('logout', 'Auth\AuthController@logout');
            Route::get('refresh', 'Auth\AuthController@refresh');
            Route::get('user', 'Auth\AuthController@user');
        });
        Route::group(['prefix' => 'file'], function () {
            Route::get('get', 'File\FileController@getFile');
        });

        Route::group(['middleware' => 'managerPermission'], function () {
            Route::resource('blacklists', 'Blacklist\BlacklistController')
                ->only('store', 'update', 'index');

            Route::group(['prefix' => 'blacklists'], static function () {
                Route::get('export', 'Blacklist\BlacklistController@export');
                Route::post('delete', 'Blacklist\BlacklistController@destroy');
            });

        });

        Route::group(['prefix' => 'users'], static function () {
            Route::get('getUsersByIds', 'User\UserController@getUsersByIds');
            Route::get('ldap_user', 'User\LdapUserController');
            Route::get('roles', 'User\UserController@getRoles');
            Route::get('change-password/{id}', 'User\UserController@changePassword');
            Route::get('notifications', 'User\UserNotificationController@index');
            Route::put('notifications/{id}', 'User\UserNotificationController@update');
            Route::delete('delete', 'User\UserController@delete');
        });

        Route::resource('users', 'User\UserController')
            ->only('store', 'update', 'show', 'index');


        Route::group(['prefix' => 'processes'], static function () {
            Route::get('export', 'Process\ProcessExportController');
            Route::get('import', 'Process\ProcessImportController');
        });

        Route::resource('industries', 'Company\IndustryController')
            ->only('store');
    });
});
