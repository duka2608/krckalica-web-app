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
                                    <th class="text-center">Pogledaj recept</th>
                                    <th class="text-center">Uredi</th>
                                    <th class="text-center">Obriši</th>
                                </tr>
                            </thead>

                            <tbody>
                                @foreach ($recipes as $recipe)
                                <tr>
                                    <td>
                                        @if($recipe->images->count() > 0)
                                        <img src="{{ asset($recipe->images[0]->path.$recipe->images[0]->name) }}" alt="{{ $recipe->name }}" height='100px'/>
                                        @else
                                            <h1>Slika</h1>
                                        @endif
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
                                                <p>Pregledi: {{ $recipe->views ? $recipe->views : 0 }}</p>
                                            </li>
                                            @if($recipe->fast)
                                                <li>
                                                    <p>Posno</p>
                                                </li>
                                            @endif
                                        </ul>
                                    </td>
                                    <td class="text-center">
                                        <a href="{{ route('admin.recipes.show', $recipe->id) }}" class="action"><i class="fa fa-eye"></i></a>
                                    </td>
                                    <td class="text-center">
                                        <a href="{{ route('admin.recipes.edit', $recipe->id) }}" class="action"><i class="fa fa-pencil-square-o"></i></a>
                                    </td>
                                    <td class="text-center">
                                        <a href="#" data-recipe={{ $recipe->id }} class="action delete-recipe"><i class="fa fa-trash-o"></i></a>
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

<div class="modal fade" id="delete-recipe-alert" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <h2 class="modal-title">Da li ste sigurni?</h2>
                <button type="button" id="delete-recipe" class="btn btn-primary" onclick="deleteRecipe()">Obriši</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Poništi</button>
                <input type="hidden" value="" id="recipe-id">
            </div>
        </div>
    </div>
</div>

<!-- /page content -->
@endsection
@section('script')
    <script>
        $('.delete-recipe').click(function(e) {
            e.preventDefault();
            let recipe = $(this).data('recipe');

            $('#recipe-id').val(recipe);
            $('#delete-recipe-alert').modal('show');
        });

        function deleteRecipe() {
            let id = $('#recipe-id').val();

            $.ajax({
            method: "DELETE",
            url: "/admin/recipes/" + id,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: 'json',
            success: function(response) {
                alert('Recept uspešno uklonjen.');
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