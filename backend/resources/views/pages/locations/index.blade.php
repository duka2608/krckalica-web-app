@extends('pages.home')
@section('content')
<!-- page content -->
<div class="right_col" role="main">
    <div class="">
        <div class="page-title">
            <div class="title_left">
                <h3>Lokacije</h3>
            </div>
        </div>

        <div class="clearfix"></div>

        <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="x_panel">
                    <div class="x_title">
                        <h2>Prikaz svih lokacija</h2>
                        <div class="clearfix"></div>
                    </div>
                    <div class="x_content">
                        @if(session()->has('success'))
                            <div class="alert alert-success">
                                <p>{{ session()->get('success') }}</p>
                            </div>
                        @endif
                        <a href="{{ route('admin.locations.create') }}" class="btn btn-default btn-block"><i class="fa fa-plus-circle" aria-hidden="true"></i>Dodaj lokaciju</a>

                        <table id="datatable" class="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Naziv lokacije</th>
                                    <th class="text-center">Uredi</th>
                                    <th class="text-center">Obriši</th>
                                </tr>
                            </thead>

                            <tbody>
                                @if ($locations)
                                    @foreach ($locations as $location)
                                        <tr>
                                            <td>{{ $location->name }}</td>
                                            <td class="text-center">
                                                <a href="{{ route('admin.locations.edit', $location->id) }}" class="action"><i class="fa fa-pencil-square-o"></i></a>
                                            </td>
                                            <td class="text-center">
                                                <a href="#" data-location={{ $location->id }} class="action delete-location"><i class="fa fa-trash-o"></i></a>
                                            </td>
                                        </tr>
                                    @endforeach
                                @endif
                            </tbody>
                        </table>
                        @if ($locations)
                            <ul class="pagination" id="pagination">
                                @for($i = 1; $i <= $locations->lastPage(); $i++)
                                    <li class="page-item"><a class="page-link" href="locations?page={{ $i }}">{{ $i }}</a></li>
                                @endfor
                            </ul>
                        @endif
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="delete-location-alert" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <h2 class="modal-title">Da li ste sigurni?</h2>
                <button type="button" id="delete-location" class="btn btn-primary" onclick="deleteLocation()">Obriši</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Poništi</button>
                <input type="hidden" value="" id="location-id">
            </div>
        </div>
    </div>
</div>

<!-- /page content -->
@endsection

@section('script')
    <script>
        $('.delete-location').click(function(e) {
            e.preventDefault();
            let location = $(this).data('location');

            $('#location-id').val(location);
            $('#delete-location-alert').modal('show');
        });

        function deleteLocation() {
            let id = $('#location-id').val();

            $.ajax({
            method: "DELETE",
            url: "/admin/locations/" + id,
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            dataType: 'json',
            success: function(response) {
                alert('Lokacija uspešno uklonjena.');
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