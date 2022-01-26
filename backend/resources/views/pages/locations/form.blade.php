@php
    $route = request()->routeIs('admin.locations.edit');
@endphp
<form method="POST" action="{{ $route ? route('admin.locations.update', $location->id) : route('admin.locations.store') }}" id="submit-admin-form" class="form-horizontal form-label-left">
    @if(request()->routeIs('admin.locations.edit'))
        @method('PUT')
    @endif
    @csrf

    <div class="form-group">
        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="location">Naziv lokacije<span class="required">*</span>
        </label>
        <div class="col-md-6 col-sm-6 col-xs-12">
            <input type="text" name="location" id="location"  class="form-control col-md-7 col-xs-12" required="required" value="{{ $route ? $location->name : old('location') }}">
            @error('location')
                <span class="error-custom error-custom-input error-location">{{ $message }}</span>
            @enderror
        </div>
    </div>
    <div class="ln_solid"></div>
    <div class="form-group">
        <div class="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
            <a href="{{ route('admin.locations') }}" class="btn btn-primary">Cancel</a>
            <button type="submit" class="btn btn-success">Submit</button>
        </div>
    </div>
</form>