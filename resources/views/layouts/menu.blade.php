<aside class="sidebar-left border-right bg-white shadow" id="leftSidebar" data-simplebar>
    <a href="#" class="btn collapseSidebar toggle-btn d-lg-none text-muted ml-3 mt-3" data-toggle="toggle">
        <i class="fe fe-x"><span class="sr-only"></span></i>
    </a>
    <nav class="vertnav navbar navbar-light">
        <div class="w-100 mb-4 d-flex">
            <a class="navbar-brand mx-auto mt-2 flex-fill text-center" href="./">
                <img class="navbar-brand-img brand-md" src="{{ asset('admin/assets/products/p3.jpg') }}" alt="">
            </a>
        </div>

        <!--Dahboard-->
        <ul class="navbar-nav flex-fill w-100 mb-2">
            <li class="nav-item dropdown">
                <a href="#dashboard" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle nav-link">
                    <i class="fe fe-grid fe-16"></i>
                    <span class="ml-3 item-text">Dashboard</span><span class="sr-only">(current)</span>
                </a>
                <ul class="collapse list-unstyled pl-4 w-100   show " id="dashboard">
                    <li class="nav-item w-100">
                        <a class="nav-link active-label " href="#">
                            <span class="ml-3 item-text">Dashboard</span>
                        </a>
                    </li>
                </ul>
            </li>
            <li class="nav-item dropdown">
                <a href="#master-data" data-toggle="collapse" aria-expanded="false" class="dropdown-toggle nav-link">
                    <i class="fe fe-box"></i>
                    <span class="ml-3 item-text">Master Data</span>
                </a>
                <ul class="collapse list-unstyled pl-4 w-100 show" id="master-data">
                    <li class="nav-item w-100">
                        <a class="nav-link" href="#">
                            <span class="ml-3 item-text">Categories</span>
                        </a>
                    </li>
                </ul>
            </li>
        </ul>
    </nav>
</aside>