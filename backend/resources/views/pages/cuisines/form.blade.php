@php
    $route = request()->routeIs('admin.cuisines.edit');
@endphp
<form method="POST" action="{{ $route ? route('admin.cuisines.update', $cuisine->id) : route('admin.cuisines.store') }}" id="submit-admin-form" class="form-horizontal form-label-left">
    @if(request()->routeIs('admin.cuisines.edit'))
        @method('PUT')
    @endif
    @csrf

    <div class="form-group">
        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="cuisine">Naziv kuhinje<span class="required">*</span>
        </label>
        <div class="col-md-6 col-sm-6 col-xs-12">
            <input type="text" name="cuisine" id="cuisine"  class="form-control col-md-7 col-xs-12" required="required" value="{{ $route ? $cuisine->name : old('cuisine') }}">
            @error('cuisine')
                <span class="error-custom error-custom-input error-cuisine">{{ $message }}</span>
            @enderror
        </div>
    </div>
    <div class="ln_solid"></div>
    <div class="form-group">
        <div class="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
            <a href="{{ route('admin.cuisines') }}" class="btn btn-primary">Cancel</a>
            <button type="submit" class="btn btn-success">Submit</button>
        </div>
    </div>
</form>