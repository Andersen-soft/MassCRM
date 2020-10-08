<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddIndexToContactsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::table('contacts', static function (Blueprint $table) {
            $table->index('created_at', 'contacts_created_at_index');
            $table->index('company_id', 'contacts_company_id_index');
            $table->index('user_id', 'contacts_user_id_index');
            $table->index('last_name', 'contacts_last_name_index');
            $table->index('full_name', 'contacts_full_name_index');
            $table->index('country', 'contacts_country_index');
        });

        Schema::table('companies_industries', static function (Blueprint $table) {
            $table->index('company_id', 'companies_industries_company_id_index');
            $table->index('industry_id', 'companies_industries_industry_id_index');
        });

        Schema::table('company_vacancies', static function (Blueprint $table) {
            $table->index('vacancy', 'company_vacancies_vacancy_index');
            $table->index('company_id', 'company_vacancies_company_id_index');
        });

        Schema::table('contact_emails', static function (Blueprint $table) {
            $table->index('contact_id', 'contact_emails_contact_id_index');
        });

        Schema::table('contact_phones', static function (Blueprint $table) {
            $table->index('contact_id','contact_phones_contact_id_index');
        });

        Schema::table('company_subsidiaries', static function (Blueprint $table) {
            $table->index('child_id','company_subsidiaries_child_id_index');
            $table->index('parent_id','company_subsidiaries_parent_id_index');
        });

        Schema::table('contact_social_networks', static function (Blueprint $table) {
            $table->index('contact_id','contact_social_networks_contact_id_index');
        });

        Schema::table('contact_colleagues', static function (Blueprint $table) {
            $table->index('contact_id','contact_colleagues_contact_id_index');
        });

        Schema::table('contact_sales', static function (Blueprint $table) {
            $table->index('contact_id','contact_sales_contact_id_index');
        });

        Schema::table('contact_mails', static function (Blueprint $table) {
            $table->index('contact_id','contact_mails_contact_id_index');
        });

        Schema::table('contact_notes', static function (Blueprint $table) {
            $table->index('contact_id','contact_notes_contact_id_index');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::table('contacts', static function (Blueprint $table) {
            $table->dropIndex('contacts_created_at_index');
            $table->dropIndex('contacts_company_id_index');
            $table->dropIndex('contacts_last_name_index');
            $table->dropIndex('contacts_full_name_index');
            $table->dropIndex('contacts_country_index');
            $table->dropIndex('contacts_user_id_index');
        });

        Schema::table('company_vacancies', static function (Blueprint $table) {
            $table->dropIndex('company_vacancies_vacancy_index');
            $table->dropIndex('company_vacancies_company_id_index');
        });

        Schema::table('companies_industries', static function (Blueprint $table) {
            $table->dropIndex('companies_industries_company_id_index');
            $table->dropIndex('companies_industries_industry_id_index');
        });

        Schema::table('contact_emails', static function (Blueprint $table) {
            $table->dropIndex('contact_emails_contact_id_index');
        });

        Schema::table('contact_phones', static function (Blueprint $table) {
            $table->dropIndex('contact_phones_contact_id_index');
        });

        Schema::table('company_subsidiaries', static function (Blueprint $table) {
            $table->dropIndex('company_subsidiaries_child_id_index');
            $table->dropIndex('company_subsidiaries_parent_id_index');
        });

        Schema::table('contact_social_networks', static function (Blueprint $table) {
            $table->dropIndex('contact_social_networks_contact_id_index');
        });

        Schema::table('contact_colleagues', static function (Blueprint $table) {
            $table->dropIndex('contact_colleagues_contact_id_index');
        });

        Schema::table('contact_sales', static function (Blueprint $table) {
            $table->dropIndex('contact_sales_contact_id_index');
        });

        Schema::table('contact_mails', static function (Blueprint $table) {
            $table->dropIndex('contact_mails_contact_id_index');
        });

        Schema::table('contact_notes', static function (Blueprint $table) {
            $table->dropIndex('contact_notes_contact_id_index');
        });
    }
}
