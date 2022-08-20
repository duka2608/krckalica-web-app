@php
    $route = request()->routeIs('admin.users.edit');
@endphp
<form method="POST" action="{{ $route ? route('admin.users.update', $data['user']->id) : route('admin.users.store') }}" id="submit-admin-form" class="form-horizontal form-label-left" enctype="multipart/form-data">
    @if(request()->routeIs('admin.users.edit'))
        @method('PUT')
    @endif
    @csrf

    <div class="form-group">
        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="first_name">Ime<span class="required">*</span>
        </label>
        <div class="col-md-6 col-sm-6 col-xs-12">
            <input type="text" name="first_name" id="first_name"  class="form-control col-md-7 col-xs-12" required="required" value="{{ $route ? $data['user']->first_name : old('first_name') }}">
            @error('first_name')
                <span class="error-custom error-custom-input error-firstname">{{ $message }}</span>
            @enderror
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="last_name">Prezime<span class="required">*</span>
        </label>
        <div class="col-md-6 col-sm-6 col-xs-12">
            <input type="text" name="last_name" id="last_name"  class="form-control col-md-7 col-xs-12" required="required" value="{{ $route ? $data['user']->last_name : old('last_name') }}">
            @error('last_name')
                <span class="error-custom error-custom-input error-lastname">{{ $message }}</span>
            @enderror
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="username">Korisnicko ime<span class="required">*</span>
        </label>
        <div class="col-md-6 col-sm-6 col-xs-12">
            <input type="text" name="username" id="username"  class="form-control col-md-7 col-xs-12" required="required" value="{{ $route ? $data['user']->username : old('username') }}">
            @error('username')
                <span class="error-custom error-custom-input error-username">{{ $message }}</span>
            @enderror
        </div>
    </div>
    <div class="form-group">
        <label for="middle-name" class="control-label col-md-3 col-sm-3 col-xs-12">E - mail <span class="required">*</span></label>
        <div class="col-md-6 col-sm-6 col-xs-12">
            <input type="email" name="email" id="email" class="form-control col-md-7 col-xs-12" required="required" value="{{ $route ? $data['user']->email : old('email') }}">
            @error('email')
                <span class="error-custom error-custom-input error-email">{{ $message }}</span>
            @enderror
        </div>
    </div>
    <div class="form-group">
        <label for="middle-name" class="control-label col-md-3 col-sm-3 col-xs-12">Uloga <span class="required">*</span></label>
        <div class="col-md-6 col-sm-6 col-xs-12">
            <select name="role" class="form-control changeUserRole">
                @foreach ($data['roles'] as $role)
                    @if($route)
                        <option value="{{ $role->id }}" @if ($role->id === $data['user']->role_id) selected @endif>
                            {{ $role->name }}
                        </option>
                    @else
                        <option value="{{ $role->id }}">{{ $role->name }}</option>
                    @endif
                @endforeach
            </select>
        </div>
    </div>
    <div class="form-group">
        <label for="middle-name" class="control-label col-md-3 col-sm-3 col-xs-12">Uloga <span class="required">*</span></label>
        <div class="col-md-6 col-sm-6 col-xs-12">
            <select name="location" class="form-control changeUserRole">
                @foreach ($data['locations'] as $location)
                    @if($route)
                        <option value="{{ $location->id }}" @if ($location->id === $data['user']->location_id) selected @endif>
                            {{ $location->name }}
                        </option>
                    @else
                        <option value="{{ $location->id }}">{{ $location->name }}</option>
                    @endif
                @endforeach
            </select>
        </div>
    </div>
    <div class="form-group">
        <label for="password" class="control-label col-md-3 col-sm-3 col-xs-12">Biografija <span class="required">*</span></label>
        <div class="col-md-6 col-sm-6 col-xs-12">
            <textarea name="biography" id="biography" class="form-control col-md-7 col-xs-12" required="required" style="resize: none">{{ $route ? $data['user']->biography : old('biography') }}</textarea>
            <span class="error-custom error-custom-input error-password"></span>
        </div>
    </div>
    <div class="form-group">
        <label for="password" class="control-label col-md-3 col-sm-3 col-xs-12">Sifra <span class="required">*</span></label>
        <div class="col-md-6 col-sm-6 col-xs-12">
            <input type="password" name="password" id="password" class="form-control col-md-7 col-xs-12" required="required">
            @error('password')
                <span class="error-custom error-custom-input error-password">{{ $message }}</span>
            @enderror
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="profile_image">Slika recepta<span class="required">*</span>
        </label>
        <div class="col-md-6 col-sm-6 col-xs-12">
            <a class="btn" title="Insert picture (or just drag & drop)" id="pictureBtn"><i class="fa fa-picture-o"></i></a>
            <input type="file" data-role="magic-overlay" name="user-image" data-target="#pictureBtn" data-edit="insertImage" accept=".jpg, .jpeg, .png" />
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