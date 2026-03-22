<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class GenerateReports implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    public function handle(): void
    {
        $tenantId = tenant('id') ?? 'NO_TENANT_CONTEXT';
        \Illuminate\Support\Facades\Log::info("GenerateReports Job executing for Tenant: {$tenantId}");
    }
}
