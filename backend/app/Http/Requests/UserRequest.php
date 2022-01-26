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
        $rules = [
            'first_name' => 'required|regex:/^([A-Z][a-z]+)$/',
            'last_name' => 'required|regex:/^([A-Z][a-z]+)$/',
            'username' => 'required|unique:users,username|min:8|max:15',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|min:8|max:20'
        ];

        // provera u situaciji kada se edituje korisnik
        // da prilikom editovanja u slucaju nepromenjenog username-a ili maila
        // ne dodje do greske da oni vec postoje u bazi
        
        if (in_array($this->method(), ['PUT', 'PATCH'])) {
            $rules['username'] = 'required|min:8|max:15|unique:users,username,'.$this->id;
            $rules['email'] = 'required|email|unique:users,email,'.$this->id;
        }

        return $rules;
        
    }

    public function messages()
    {
        return [
            'first_name.regex' => 'First letter must be uppercase.',
            'last_name.regex' => 'First letter must be uppercase.'
        ];
    }
}
