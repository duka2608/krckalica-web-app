<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'first_name' => 'required|regex:/^([A-Z][a-z]+)$/',
            'last_name' => 'required|regex:/^([A-Z][a-z]+)$/',
            'username' => 'required|unique:users,username|min:8|max:15',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|max:20'
        ];
        
    }

    public function messages()
    {
        return [
            'first_name.regex' => 'First letter must be uppercase.',
            'last_name.regex' => 'First letter must be uppercase.'
        ];
    }
}
