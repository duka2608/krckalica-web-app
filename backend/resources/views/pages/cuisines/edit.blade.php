@extends('pages.home')
@section('content')
<div class="loading" delay-hide="50000"></div>
<div class="right_col" role="main">
    <div class="">
        <div class="page-title">
            <div class="title_left">
                <h3>Izmeni kuhinju</h3>
            </div>
        </div>

        <div class="clearfix"></div>

        <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="x_panel">
                    <div class="x_title">
                        <h2>Izmeni kuhinju</h2>
                        <div class="clearfix"></div>
                    </div>
                    <div class="x_content">
                         @include('pages.cuisines.form')
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection