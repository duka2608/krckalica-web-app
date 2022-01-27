@extends('pages.home')
@section('content')
<!-- page content -->
<div class="right_col" role="main">
    <div class="">
        <div class="page-title">
            <div class="title_left">
                <h3>Recepti</h3>
            </div>
        </div>

        <div class="clearfix"></div>

        <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="x_panel">
                    <div class="x_title">
                        <h2>Prikaz svih recepata</h2>
                        <div class="clearfix"></div>
                    </div>
                    <div class="x_content">
                        @if(session()->has('success'))
                            <div class="alert alert-success">
                                <p>{{ session()->get('success') }}</p>
                            </div>
                        @endif
                        <a href="{{ route('admin.recipes.create') }}" class="btn btn-default btn-block"><i class="fa fa-plus-circle" aria-hidden="true"></i>Dodaj recept</a>

                        <table id="datatable" class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Slika</th>
                                    <th>Informacije</th>
                                    <th>Opcije</th>
                                </tr>
                            </thead>

                            <tbody>
                                @foreach ($recipes as $recipe)
                                <tr>
                                    <td>
                                        <h1>Slika</h1>
                                    </td>
                                    <td>
                                        <h4>{{ $recipe->name }}</h4>
                                        <ul class="list-inline">
                                            <li>
                                                <p># {{ $recipe->id }}</p>
                                            </li>
                                            <li>
                                                <p>Objavljen: {{ $recipe->created_at->format('d.m.Y') }}</p>
                                            </li>
                                            <li>
                                                <p>Korisnik: {{ $recipe->user->first_name.' '.$recipe->user->last_name }}</p>
                                            </li>
                                            <li>
                                                <p>Pregledi: 128</p>
                                            </li>
                                            @if($recipe->fast)
                                                <li>
                                                    <p>Posno</p>
                                                </li>
                                            @endif
                                        </ul>
                                    </td>
                                    <td class="model-options">
                                        <h1>Opcije</h1>

                                                {{-- <button data-tooltip title="Add discount" class="model-options-button model-options-smaller model-options-qoute" data-model="{{$model}}">
                                                    <img src="{{ asset('assets/images/pound.png')  }}" alt="Pound">
                                                </button>
                                
                                            <button data-tooltip title="Finish project" data-id="{{$model->id}}" class="model-options-button model-options-flag">
                                                <img src="{{ asset('assets/images/flag.png')  }}" alt="Flags">
                                            </button>
                                            <button data-tooltip title="Feedback received" class="model-options-button model-options-chat" data-id="{{$model->id}}">
                                                <img src="{{ asset('assets/images/chat.png')}}" alt="Chat">
                                            </button>
                                            <button data-tooltip title="Download assets" class="model-options-button model-option-download" data-id="{{$model->id}}">
                                                <img src="{{ asset('assets/images/download.png')}}" alt="Download Model">
                                            </button>
                                            <button data-tooltip title="View solution" class="model-options-button model-solution"
                                                    data-link="{{$model->solution_link}}">
                                                <img src="{{ asset('assets/images/go_to_solution.png')  }}" alt="Solution">
                                            </button>
                                            <button data-tooltip title="View model" class="model-options-button model-link model-eye" data-id="{{$model->id}}">
                                                <img src="{{ asset('assets/images/eye.png')}}" alt="Eye">
                                            </button> --}}
                                
                                    </td>
                                </tr>
                                @endforeach
                            </tbody>
                        </table>
                        {{-- @if ($users)
                            <ul class="pagination" id="pagination">
                                @for($i = 1; $i <= $users->lastPage(); $i++)
                                    <li class="page-item"><a class="page-link" href="users?page={{ $i }}">{{ $i }}</a></li>
                                @endfor
                            </ul>
                        @endif --}}
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