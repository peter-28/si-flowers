<button type="button" class="navbar-toggler text-muted mt-2 p-0 mr-3 collapseSidebar">
    <i class="fe fe-menu navbar-toggler-icon"></i>
</button>
<ul class="nav">
    <li class="nav-item nav-notif">
        <a class="nav-link text-muted my-2" href="./#" data-toggle="modal" data-target=".modal-notif">
            <span class="fe fe-bell fe-16"></span>
            <span class="dot dot-md bg-success"></span>
        </a>
    </li>

    <li class="nav-item text-right ml-2 mt-2">
        <span class="font-weight-bold text-black mb-0" style="font-size: 14px">Administrator</span>
        <br>
        <span class="mb-0" style="font-size: 12px">Top Management</span>
    </li>
    <li class="nav-item dropdown ">
        <a class="nav-link dropdown-toggle text-muted pr-0" href="#" id="navbarDropdownMenuLink" role="button"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="avatar avatar-sm mt-2">
                <img src="{{ asset('admin/assets/products/p3.jpg') }}" alt="..." class="avatar-img rounded-circle">
            </span>
        </a>
        <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
            <a class="dropdown-item" href="#"><i class="fe fe-user mr-2"></i>Profile</a>
            <a class="dropdown-item" href="#"><i class="fe fe-activity mr-2"></i>Activities</a>
            <a class="dropdown-item " style="color: black; cursor: pointer" data-toggle="modal"
                data-target="#modal-laporkan-bug-mk"><i class="fe fe-message-square mr-2"></i>Laporkan
                Bug</a>
            <a class="dropdown-item" href="#" onclick="event.preventDefault();
                document.getElementById('logout-form').submit();"><i class="fe fe-power mr-2"></i>Logout</a>
            <form id="logout-form" action="#" method="POST" style="display: none;">
                <input type="hidden" name="_token" value="qOsiOgwqssca0k4D6Dp5gb2nBNd1Pjw4R1GKWnQu">
            </form>
        </div>
    </li>
</ul>