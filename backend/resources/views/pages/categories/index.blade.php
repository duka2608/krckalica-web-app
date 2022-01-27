@extends('pages.home')
@section('content')
<!-- page content -->
<div class="right_col" role="main">
    <div class="">
        <div class="page-title">
            <div class="title_left">
                <h3>Kategorije</h3>
            </div>
        </div>

        <div class="clearfix"></div>

        <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="x_panel">
                    <div class="x_title">
                        <h2>Prikaz svih kategorija</h2>
                        <div class="clearfix"></div>
                    </div>
                    <div class="x_content">
                        @if(session()->has('success'))
                            <div class="alert alert-success">
                                <p>{{ session()->get('success') }}</p>
                            </div>
                        @endif
                        <a href="{{ route('admin.categories.create') }}" class="btn btn-default btn-block"><i class="fa fa-plus-circle" aria-hidden="true"></i>Dodaj kategoriju</a>

                        <table id="datatable" class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Naziv kategorije</th>
                                    <th class="text-center">Uredi</th>
                                    <th class="text-center">Obriši</th>
                                </tr>
                            </thead>

                            <tbody>
                                @if ($categories)
                                    @foreach ($categories as $category)
                                        <tr>
                                            <td>{{ $category->name }}</td>
                                            <td class="text-center">
                                                <a href="{{ route('admin.categories.edit', $category->id) }}" class="action"><i class="fa fa-pencil-square-o"></i></a>
                                            </td>
                                            <td class="text-center">
                                                <a href="#" data-category={{ $category->id }} class="action delete-category"><i class="fa fa-trash-o"></i></a>
                                            </td>
                                        </tr>
                                    @endforeach
                                @endif
                            </tbody>
                        </table>
                        @if ($categories)
                            <ul class="pagination" id="pagination">
                                @for($i = 1; $i <= $categories->lastPage(); $i++)
                                    <li class="page-item"><a class="page-link" href="categories?page={{ $i }}">{{ $i }}</a></li>
                                @endfor
                            </ul>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="delete-category-alert" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <h2 class="modal-title">Da li ste sigurni?</h2>
                <button type="button" id="delete-category" class="btn btn-primary" onclick="deleteCategory()">Obriši</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Poništi</button>
                <input type="hidden" value="" id="category-id">
            </div>
        </div>
    </div>
</div>

<!-- /page content -->
@endsection

@section('script')
    <script>
        $('.delete-category').click(function(e) {
            e.preventDefault();
            let category = $(this).data('category');

            $('#category-id').val(category);
            $('#delete-category-alert').modal('show');
        });

        function deleteCategory() {
            let id = $('#category-id').val();

            $.ajax({
            method: "DELETE",
            url: "/admin/categories/" + id,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: 'json',
            success: function(response) {
                alert(response.success)
                location.reload();
            },
            error: function (xhr, error, message) {
                console.log(error);
                alert(response.error)
            }
            
        })
           
        }

    </script>
@endsection