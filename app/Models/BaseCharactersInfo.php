<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BaseCharactersInfo extends Model
{
    protected $table = 'base_character_info';
    protected $primaryKey = 'id';
    use HasFactory;
}
