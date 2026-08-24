<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('config', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get("/theme-a", function () {
        return Inertia::render('theme-a');
    })->name('theme-a');
    Route::get("/theme-b", function () {
        return Inertia::render('theme-b');
    })->name('theme-b');
    Route::get("/theme-c", function () {
        return Inertia::render('theme-c');
    })->name('theme-c');
    Route::get("/theme-d", function () {
        return Inertia::render('theme-d');
    })->name('theme-d');
    Route::get("/theme-e", function () {
        return Inertia::render('theme-e');
    })->name('theme-e');
    Route::get("/theme-f", function () {
        return Inertia::render('theme-f');
    })->name('theme-f');
    Route::get("/theme-g", function () {
        return Inertia::render('theme-g');
    })->name('theme-g');
    Route::get("/theme-h", function () {
        return Inertia::render('theme-h');
    })->name('theme-h');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
