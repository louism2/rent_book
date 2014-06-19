# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140619055300) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"
  enable_extension "hstore"

  create_table "buildings", force: true do |t|
    t.string   "name",       limit: 100
    t.string   "address",    limit: 100
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "landlords", force: true do |t|
    t.string   "name",       limit: 50
    t.string   "email",      limit: 70
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "managers", force: true do |t|
    t.string   "name",             limit: 50
    t.string   "email",            limit: 70
    t.integer  "responsibilities",            array: true
    t.string   "phone_number",     limit: 10
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "payments", force: true do |t|
    t.integer  "tenant_id"
    t.integer  "receivable_id"
    t.decimal  "amount",        precision: 7, scale: 2
    t.date     "payment_date"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "receivables", force: true do |t|
    t.integer  "unit_id"
    t.decimal  "balance",    precision: 7, scale: 2
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "tenants", force: true do |t|
    t.string   "name",               limit: 50
    t.string   "email",              limit: 70
    t.date     "date_of_birth"
    t.string   "stripe_token",       limit: 50
    t.integer  "rental_obligations",            array: true
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "units", force: true do |t|
    t.integer  "building_id"
    t.decimal  "monthly_rent", precision: 7, scale: 5
    t.integer  "tenants",                              array: true
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
