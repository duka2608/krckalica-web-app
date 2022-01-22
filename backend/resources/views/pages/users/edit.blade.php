@extends('pages.home')
@section('content')

@section('content')

<!-- page content -->
<div class="loading" delay-hide="50000"></div>
<div class="right_col" role="main">
    <div class="">
        <div class="page-title">
            <div class="title_left">
                <h3>Edit users</h3>
            </div>
        </div>

        <div class="clearfix"></div>

        <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="x_panel">
                    <div class="x_title">
                        <h2>Edit users</h2>
                        <div class="clearfix"></div>
                    </div>
                    <div class="x_content">
                        <form action="#" id="submit-admin-edit-form" class="form-horizontal form-label-left">
                            <input type="hidden" name="id" value="1">
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12" for="firstname">Ime<span class="required">*</span>
                                </label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" name="firstname" id="firstname" value="Dusko" class="form-control col-md-7 col-xs-12" required="required">
                                    <span class="error-custom error-custom-input error-firstname"></span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="control-label col-md-3 col-sm-3 col-xs-12" for="lastname">Prezime<span class="required">*</span>
                                </label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="text" name="lastname" id="lastname" value="Stupar" class="form-control col-md-7 col-xs-12" required="required">
                                    <span class="error-custom error-custom-input error-lastname"></span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="middle-name" class="control-label col-md-3 col-sm-3 col-xs-12">E - mail <span class="required">*</span></label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="email" name="email" id="email" value="dusko@gmail.com" class="form-control col-md-7 col-xs-12" required="required">
                                    <span class="error-custom error-custom-input error-email"></span>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="middle-name" class="control-label col-md-3 col-sm-3 col-xs-12">Uloga <span class="required">*</span></label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <select class="form-control changeUserRole">
                                        <option>Administrator</option>
                                        <option>Korisnik</option>
                                    </select>
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="password" class="control-label col-md-3 col-sm-3 col-xs-12">Sifra<span class="required">*</span></label>
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <input type="password" name="password" id="password" class="form-control col-md-7 col-xs-12">
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
<!-- /page content -->

@stop

@section('scripts')

@stop

@endsection