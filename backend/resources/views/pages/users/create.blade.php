@extends('pages.home')
@section('content')
<div class="loading" delay-hide="50000"></div>
<div class="right_col" role="main">
    <div class="">
        <div class="page-title">
            <div class="title_left">
                <h3>Add Users</h3>
            </div>
        </div>

        <div class="clearfix"></div>

        <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="x_panel">
                    <div class="x_title">
                        <h2>Add Users</h2>
                        <div class="clearfix"></div>
                    </div>
                    <div class="x_content">
                        <form method="POST" action="{{ route('admin.users.store') }}" id="submit-admin-form" class="form-horizontal form-label-left">
                            @csrf
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12" for="first_name">Ime<span class="required">*</span>
                                </label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" name="first_name" id="first_name"  class="form-control col-md-7 col-xs-12" required="required">
                                    <span class="error-custom error-custom-input error-firstname"></span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last_name">Prezime<span class="required">*</span>
                                </label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" name="last_name" id="last_name"  class="form-control col-md-7 col-xs-12" required="required">
                                    <span class="error-custom error-custom-input error-lastname"></span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12" for="username">Korisnicko ime<span class="required">*</span>
                                </label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" name="username" id="username"  class="form-control col-md-7 col-xs-12" required="required">
                                    <span class="error-custom error-custom-input error-username"></span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="middle-name" class="control-label col-md-3 col-sm-3 col-xs-12">E - mail <span class="required">*</span></label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="email" name="email" id="email" class="form-control col-md-7 col-xs-12" required="required">
                                    <span class="error-custom error-custom-input error-email"></span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="middle-name" class="control-label col-md-3 col-sm-3 col-xs-12">Uloga <span class="required">*</span></label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <select name="role" class="form-control changeUserRole">
                                        @foreach ($roles as $role)
                                            <option value="{{ $role->id }}">{{ $role->name }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="middle-name" class="control-label col-md-3 col-sm-3 col-xs-12">Uloga <span class="required">*</span></label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <select name="location" class="form-control changeUserRole">
                                        @foreach ($locations as $location)
                                            <option value="{{ $location->id }}">{{ $location->name }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="password" class="control-label col-md-3 col-sm-3 col-xs-12">Biografija <span class="required">*</span></label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <textarea name="biography" id="biography" class="form-control col-md-7 col-xs-12" required="required" style="resize: none"></textarea>
                                    <span class="error-custom error-custom-input error-password"></span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="password" class="control-label col-md-3 col-sm-3 col-xs-12">Sifra <span class="required">*</span></label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="password" name="password" id="password" class="form-control col-md-7 col-xs-12" required="required">
                                    <span class="error-custom error-custom-input error-password"></span>
                                </div>
                            </div>
                            <div class="ln_solid"></div>
                            <div class="form-group">
                                <div class="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
                                    <a href="{{ route('admin.users') }}" class="btn btn-primary">Cancel</a>
                                    <button type="submit" class="btn btn-success">Submit</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection