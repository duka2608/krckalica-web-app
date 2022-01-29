@extends('pages.home')
@section('content')
<div class="right_col" role="main">
    <div class="">
      <div class="page-title">

      <div class="row">
        <div class="col-md-12">
          <div class="x_panel">
            <div class="x_title">
              <h1>{{ $recipe->name }}</h1>
              <div class="clearfix"></div>
            </div>

            <div class="x_content">

              <div class="col-md-9 col-sm-9 col-xs-12">

                <div id="mainb" style="height:350px;">
                    <h1>Slika recepta</h1>
                </div>

                <div>

                  <h4>Komentari</h4>

                  <!-- end of user messages -->
                  <ul class="messages">
                    @if($recipe->comments->count())
                      @foreach ($recipe->comments as $comment)
                      <li>
                        <img src="{{ asset('assets/gentelella/production/images/user.png') }}" class="avatar" alt="Avatar">
                        <div class="message_date">
                          <h3 class="date text-info">{{ $comment->created_at->format('jS') }}</h3>
                          <p class="month">{{ $comment->created_at->format('F') }}</p>
                        </div>
                        <div class="message_wrapper">
                          <h4 class="heading">{{ $comment->user->first_name.' '.$comment->user->last_name }}</h4>
                          <p>{{ $comment->created_at->format('H:i:s') }}</p>
                          <blockquote class="message">{{ $comment->content }}</blockquote>
                          <br />
                          <p class="url">
                            <a href="#" data-comment={{ $comment->id }} class="btn btn-sm btn-danger delete-comment-btn">Ukloni komentar</a>
                          </p>
                        </div>
                      </li>
                      @endforeach
                    @else
                      <h3>Nema komentara za ovaj recept.</h3>
                    @endif
                  </ul>
                  <!-- end of user messages -->


                </div>


              </div>

              <!-- start project-detail sidebar -->
              <div class="col-md-3 col-sm-3 col-xs-12">

                <section class="panel">

                  <div class="x_title">
                    <h2>{{ $recipe->category->name }}</h2>
                    <div class="clearfix"></div>
                  </div>
                  <div class="panel-body">
                    <h3 class="green">{{ $recipe->name }}</h3>

                    <p>{{ $recipe->description }}</p>
                    <br />

                    <div class="project_detail">
                      <p class="title">Kuhinja</p>
                      <p>{{ $recipe->cuisine->name }}</p>
                      <p class="title">Vreme pripreme</p>
                      <p>{{ $recipe->preparation_time }}</p>
                      <p class="title">Broj porcija</p>
                      <p>{{ $recipe->portions }}</p>
                    </div>
                    <div class="project_detail">
                      <p class="title">Pregledi</p>
                      <p>{{ $recipe->views ? $recipe->views : 0 }}</p>

                      <p>{{ $recipe->fast ? 'Posno' : '' }}</p>

                    </div>

                    <br />
                    <h5>Sastojci</h5>
                    <ul class="title">
                      @foreach ($recipe->ingredients as $ingredient)
                        <li>
                            {{ $ingredient->name.' '.$ingredient->amount }}
                        </li>
                      @endforeach
                    </ul>
                    <br />

                    <div class="text-center mtop20">
                      <a href="{{ route('admin.recipes.edit', $recipe->id) }}" class="btn btn-sm btn-primary">Uredi recept</a>
                      <a href="{{ route('admin.recipes') }}" class="btn btn-sm btn-success">Nazad</a>
                    </div>
                  </div>

                </section>

              </div>
              <!-- end project-detail sidebar -->

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="delete-comment-alert" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-body">
                <h2 class="modal-title">Da li ste sigurni?</h2>
                <button type="button" id="delete-comment" class="btn btn-primary" onclick="deleteComment()">Obriši</button>
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Poništi</button>
                <input type="hidden" value="" id="comment-id">
            </div>
        </div>
    </div>
</div>
@endsection

@section('script')
    <script>
        $('.delete-comment-btn').click(function(e) {
            e.preventDefault();
            let comment = $(this).data('comment');

            $('#comment-id').val(comment);
            $('#delete-comment-alert').modal('show');
        });

        function deleteComment() {
              let id = $('#comment-id').val();

              $.ajax({
              method: "DELETE",
              url: "/admin/comments/" + id,
              headers: {
                  'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
              },
              dataType: 'json',
              success: function(response) {
                  alert(response.success);
                  location.reload();
              },
              error: function (xhr, error, message) {
                  console.log(error);
              }
          });
           
        }

    </script>
@endsection