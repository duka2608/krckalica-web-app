@extends('pages.home')
@section('content')
<!-- page content -->
<div class="right_col" role="main">
    <div class="">
        <div class="page-title">
            <div class="title_left">
                <h3>Korisnici</h3>
            </div>
        </div>

        <div class="clearfix"></div>

        <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="x_panel">
                    <div class="x_title">
                        <h2>Prikaz svih korisnika</h2>
                        <div class="clearfix"></div>
                    </div>
                    <div class="x_content">
                        <a href="{{ route('admin.users.create') }}" class="btn btn-default btn-block"><i class="fa fa-plus-circle" aria-hidden="true"></i>Dodaj korisnika</a>

                        <table id="datatable" class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Ime i prezime</th>
                                    <th>Korisnicko ime</th>
                                    <th>E - mail</th>
                                    <th>Uloga</th>
                                    <th class="text-center">Uredi</th>
                                    <th class="text-center">Obrisi</th>
                                </tr>
                            </thead>

                            <tbody>
                                @if ($users)
                                    @foreach ($users as $user)
                                        <tr>
                                            <td>{{ $user->first_name.' '.$user->last_name }}</td>
                                            <td>{{ $user->username }}</td>
                                            <td>{{ $user->email }}</td>
                                            <td>{{ $user->role->name }}</td>
                                            <td class="text-center">
                                                <a href="{{ route('admin.users.edit', $user->id) }}" class="action"><i class="fa fa-pencil-square-o"></i></a>
                                            </td>
                                            <td class="text-center">
                                                <a href="{{ route('admin.users.destroy', $user->id) }}" class="action"><i class="fa fa-trash-o"></i></a>
                                            </td>
                                        </tr>
                                    @endforeach
                                @endif
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-- /page content -->
@endsection