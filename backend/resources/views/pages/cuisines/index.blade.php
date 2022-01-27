@extends('pages.home')
@section('content')
<!-- page content -->
<div class="right_col" role="main">
    <div class="">
        <div class="page-title">
            <div class="title_left">
                <h3>Kuhinje</h3>
            </div>
        </div>

        <div class="clearfix"></div>

        <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="x_panel">
                    <div class="x_title">
                        <h2>Prikaz svih kuhinja</h2>
                        <div class="clearfix"></div>
                    </div>
                    <div class="x_content">
                        @if(session()->has('success'))
                            <div class="alert alert-success">
                                <p>{{ session()->get('success') }}</p>
                            </div>
                        @endif
                        <a href="{{ route('admin.cuisines.create') }}" class="btn btn-default btn-block"><i class="fa fa-plus-circle" aria-hidden="true"></i>Dodaj kuhinju</a>

                        <table id="datatable" class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Naziv kuhinje</th>
                                    <th class="text-center">Uredi</th>
                                    <th class="text-center">Obriši</th>
                                </tr>
                            </thead>

                            <tbody>
                                @if ($cuisines)
                                    @foreach ($cuisines as $cuisine)
                                        <tr>
                                            <td>{{ $cuisine->name }}</td>
                                            <td class="text-center">
                                                <a href="{{ route('admin.cuisines.edit', $cuisine->id) }}" class="action"><i class="fa fa-pencil-square-o"></i></a>
                                            </td>
                                            <td class="text-center">
                                                <a href="#" data-cuisine={{ $cuisine->id }} class="action delete-cuisine"><i class="fa fa-trash-o"></i></a>
                                            </td>
                                        </tr>
                                    @endforeach
                                @endif
                            </tbody>
                        </table>
                        @if ($cuisines)
                            <ul class="pagination" id="pagination">
                                @for($i = 1; $i <= $cuisines->lastPage(); $i++)
                                    <li class="page-item"><a class="page-link" href="cuisines?page={{ $i }}">{{ $i }}</a></li>
                                @endfor
                            </ul>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="delete-cuisine-alert" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <h2 class="modal-title">Da li ste sigurni?</h2>
                <button type="button" id="delete-cuisine" class="btn btn-primary" onclick="deleteCuisine()">Obriši</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Poništi</button>
                <input type="hidden" value="" id="cuisine-id">
            </div>
        </div>
    </div>
</div>

<!-- /page content -->
@endsection

@section('script')
    <script>
        $('.delete-cuisine').click(function(e) {
            e.preventDefault();
            let cuisine = $(this).data('cuisine');

            $('#cuisine-id').val(cuisine);
            $('#delete-cuisine-alert').modal('show');
        });

        function deleteCuisine() {
            let id = $('#cuisine-id').val();

            $.ajax({
            method: "DELETE",
            url: "/admin/cuisines/" + id,
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