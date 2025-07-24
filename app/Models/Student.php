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
    protected $fillable = [
        'StudentID',
        'FirstName',
        'LastName',
        'MiddleName',
        'BirthDate',
        'Gender',
        'Email',
        'ContactNumber',
        'Address',
        'Barangay',
        'City',
        'ProgramID',
        'YearLevel',
        'Status'
    ];

    
}
