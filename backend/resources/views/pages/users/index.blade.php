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
                        @if(session()->has('success'))
                            <div class="alert alert-success">
                                <p>{{ session()->get('success') }}</p>
                            </div>
                        @endif
                        <a href="{{ route('admin.users.create') }}" class="btn btn-default btn-block"><i class="fa fa-plus-circle" aria-hidden="true"></i>Dodaj korisnika</a>

                        <table id="datatable" class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Ime i prezime</th>
                                    <th>Korisnicko ime</th>
                                    <th>E - mail</th>
                                    <th>Uloga</th>
                                    <th class="text-center">Uredi</th>
                                    <th class="text-center">Obriši</th>
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
                                                <a href="#" data-user={{ $user->id }} class="action delete-user"><i class="fa fa-trash-o"></i></a>
                                            </td>
                                        </tr>
                                    @endforeach
                                @endif
                            </tbody>
                        </table>
                        @if ($users)
                            <ul class="pagination" id="pagination">
                                @for($i = 1; $i <= $users->lastPage(); $i++)
                                    <li class="page-item"><a class="page-link" href="users?page={{ $i }}">{{ $i }}</a></li>
                                @endfor
                            </ul>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="delete-user-alert" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <h2 class="modal-title">Da li ste sigurni?</h2>
                <button type="button" id="delete-user" class="btn btn-primary" onclick="deleteUser()">Obriši</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Poništi</button>
                <input type="hidden" value="" id="user-id">
            </div>
        </div>
    </div>
</div>

<!-- /page content -->
@endsection

@section('script')
    <script>
        $('.delete-user').click(function(e) {
            e.preventDefault();
            let user = $(this).data('user');

            $('#user-id').val(user);
            $('#delete-user-alert').modal('show');
        });

        function deleteUser() {
            let id = $('#user-id').val();

            $.ajax({
            method: "DELETE",
            url: "/admin/users/" + id,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: 'json',
            success: function(response) {
                alert('Korisnik uspešno uklonjen.');
                console.log(response);
                location.reload();
            },
            error: function (xhr, error, message) {
                console.log(error);
            }
            
        })
           
        }

    </script>
@endsection