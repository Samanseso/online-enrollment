<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */

    protected $primaryKey = 'student_id';

    
    protected $fillable = [
        "first_name",
        "last_name",
        "middle_name",
        "birth_date",
        "gender",
        "email",
        "contact_number",
        "address",
        "barangay",
        "city",
        "program_id",
        "year_level",
        "status"
    ];

    
}
