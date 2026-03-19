<?php

namespace App\Concerns;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

/**
 * Trait to enforce tenant scoping on models.
 *
 * This trait adds a global scope to ensure queries are always limited to the
 * authenticated user's tenant, and will automatically fill the tenant_id when
 * creating or updating models.
 */
trait HasTenant
{
    /**
     * Boot the trait.
     */
    public static function bootHasTenant(): void
    {
        static::addGlobalScope('tenant', function (Builder $builder): void {
            if (Auth::check()) {
                $builder->where($builder->getModel()->getTable() . '.tenant_id', Auth::user()->tenant_id);
            }
        });

        static::creating(function (Model $model): void {
            if (Auth::check()) {
                $model->tenant_id = Auth::user()->tenant_id;
            }
        });

        static::updating(function (Model $model): void {
            if (Auth::check()) {
                $model->tenant_id = Auth::user()->tenant_id;
            }
        });
    }

    /**
     * Scope a query to the provided tenant.
     */
    public function scopeForTenant(Builder $query, ?string $tenantId = null): Builder
    {
        $tenantId = $tenantId ?: Auth::user()?->tenant_id;

        if (! $tenantId) {
            return $query;
        }

        return $query->where($query->getModel()->getTable() . '.tenant_id', $tenantId);
    }
}
