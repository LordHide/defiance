<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SkilsAsociated extends Model
{
    protected $table = 'skills_asociated';
    protected $primaryKey = 'id';
    use HasFactory;
}
