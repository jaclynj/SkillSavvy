# describe "the signin process", :type => :feature do
#   before :each do
#     User.make(:email => 'user@example.com', :password => 'caplin')
#   end

#   it "signs me in" do
#     visit '/sessions/new'
#     within("#session") do
#       fill_in 'Login', :with => 'user@example.com'
#       fill_in 'Password', :with => 'password'
#     end
#     click_link 'Sign in'
#     expect(page).to have_content 'Success'
#   end

#   describe 'some stuff which requires js', :js => true do
#   it 'will use the default js driver'
#   it 'will switch to one specific driver', :driver => :webkit
# end
# end
