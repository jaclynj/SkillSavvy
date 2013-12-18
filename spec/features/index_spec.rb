require "spec_helper"

describe "the signin process", :type => :feature do
  before :each do
    User.create(:email => 'user@example.com', :password => 'caplin')
  end

  it "signs me in" do
    visit '/login'
    within("#log-in") do
      fill_in 'email', :with => 'user@example.com'
      fill_in 'password', :with => 'caplin'
    end
    click_button 'Log in'
    expect(page).to have_content 'Logged in!'
  end

#   describe 'some stuff which requires js', :js => true do
#   it 'will use the default js driver'
#   it 'will switch to one specific driver', :driver => :webkit
# end
end
